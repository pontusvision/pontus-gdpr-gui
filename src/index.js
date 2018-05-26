import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Keycloak from "keycloak-js";
import axios from "axios";

(function(){
  
  
  
  
  let attachEvent = document.attachEvent;
  
  if (!attachEvent)
  {
    let requestFrame = (function ()
    {
      let raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function (fn) { return window.setTimeout(fn, 200); };
      return function (fn) { return raf(fn); };
    })();
  
    let cancelFrame = (function ()
    {
      let cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
        window.clearTimeout;
      return function (id) { return cancel(id); };
    })();
  
    function resetTriggers(element)
    {
      try {
        let triggers = element.__resizeTriggers__,
          expand = triggers.firstElementChild,
          contract = triggers.lastElementChild,
          expandChild = expand.firstElementChild;
        contract.scrollLeft = contract.scrollWidth;
        contract.scrollTop = contract.scrollHeight;
        expandChild.style.width = expand.offsetWidth + 1 + 'px';
        expandChild.style.height = expand.offsetHeight + 1 + 'px';
        expand.scrollLeft = expand.scrollWidth;
        expand.scrollTop = expand.scrollHeight;
  
      }
      catch (e){
      
      }
    }
  
    function checkTriggers(element)
    {
      return element.offsetWidth !== element.__resizeLast__.width ||
        element.offsetHeight !== element.__resizeLast__.height;
    }
  
    function scrollListener(e)
    {
      let element = this;
      resetTriggers(this);
      if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
      this.__resizeRAF__ = requestFrame(function ()
      {
        if (checkTriggers(element))
        {
          element.__resizeLast__.width = element.offsetWidth;
          element.__resizeLast__.height = element.offsetHeight;
          element.__resizeListeners__.forEach(function (fn)
          {
            fn.call(element, e);
          });
        }
      });
    }
  
  
    window.addResizeListener = function (element, fn)
    {
      if (attachEvent) element.attachEvent('resize', fn);
      else
      {
        if (!element.__resizeTriggers__)
        {
          if (getComputedStyle(element).position === 'static') element.style.position = 'relative';
          element.__resizeLast__ = {};
          element.__resizeListeners__ = [];
          (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
          element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
            '<div class="contract-trigger"></div>';
          element.appendChild(element.__resizeTriggers__);
          resetTriggers(element);
          element.addEventListener('scroll', scrollListener, true);
        }
        element.__resizeListeners__.push(fn);
      }
    };
  
    window.removeResizeListener = function (element, fn)
    {
      if (attachEvent) element.detachEvent('resize', fn);
      else
      {
        element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
        if (!element.__resizeListeners__.length)
        {
          element.removeEventListener('scroll', scrollListener);
          element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
        }
      }
    }
  }
  
  function loadJSON(path, success, error)
  {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (success)
            success(JSON.parse(xhr.responseText));
        } else {
          if (error)
            error(xhr);
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
  }
  
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  {
    // dev mode - skip keycloak stuff...
  }
  else
  {
  
    loadJSON('pvgdpr_gui/keycloak-conf.json',
      function (kcConf)
      {
      
      
        const kc = Keycloak(kcConf);
        kc.init({adapter: 'default', onLoad: 'login-required'}).success(authenticated =>
        {
          if (authenticated)
          {
            // store.getState().keycloak = kc;
            // ReactDOM.render(app, document.getElementById("app"));
            window.keycloakInstance = kc;
            ReactDOM.render(<App keycloak={kc}/>, document.getElementById('root'));
          
          }
        });
      
        axios.interceptors.request.use(config =>
        {
          return refreshToken().then(() =>
          {
            config.headers.Authorization = 'Bearer ' + kc.idToken;
            return Promise.resolve(config)
          }).catch(() =>
          {
            kc.login();
          })
        });

// need to wrap the KC "promise object" into a real Promise object
        const refreshToken = (minValidity = 5) =>
        {
          return new Promise((resolve, reject) =>
          {
            kc.updateToken(minValidity)
              .success(() => resolve())
              .error(error => reject(error))
          });
        };
      
      
      },
      function (xhr) { console.error(xhr); });
  }
  
  
})();

 // ReactDOM.render(<App  />, document.getElementById('root'));

registerServiceWorker();
