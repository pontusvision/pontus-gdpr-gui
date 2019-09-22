import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class NavPanelInternationalPVGridRegulators extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("NavPanelInternational");
    
    super.componentDidMount();
    
    let colSettings = [];
  
    /*
     orgLabel = createVertexLabel(mgmt, "Organisation")
     orgRegNumber = createProp(mgmt, "Organisation.Registration_Number", String.class, org.janusgraph.core.Cardinality.SINGLE)
     orgType = createProp(mgmt, "Organisation.Type", String.class, org.janusgraph.core.Cardinality.SET)
     orgName = createProp(mgmt, "Organisation.Name", String.class, org.janusgraph.core.Cardinality.SINGLE)
     orgShortName = createProp(mgmt, "Organisation.Short_Name", String.class, org.janusgraph.core.Cardinality.SINGLE)
     orgTaxId = createProp(mgmt, "Organisation.Tax_Id", String.class, org.janusgraph.core.Cardinality.SINGLE)
     orgSector = createProp(mgmt, "Organisation.Sector", String.class, org.janusgraph.core.Cardinality.SET)
 
     orgCountry = createProp(mgmt, "Organisation.orgCountrySet", String.class, org.janusgraph.core.Cardinality.SET)
     createMixedIdx(mgmt, "orgCountryMixedIdx", orgCountry)
 
     createMixedIdx(mgmt, "orgNameMixedMixedIdx", orgName)
     createMixedIdx(mgmt, "orgRegNumberMixedIdx", orgRegNumber)
 
 
     */
    
    // colSettings[0] = {id: "Person.Natural.Title", name: "Title", field: "Person.Natural.Title", sortable: true};
    colSettings[0] = {id: "Person.Organisation.Short_Name", name: "Short Name", field: "Person.Organisation.Short_Name", sortable: true};
  
    colSettings[1] = {id: "Person.Organisation.Name", name: "Long Name", field: "Person.Organisation.Name", sortable: true};
    colSettings[2] = {id: "Person.Organisation.orgCountrySet", name: "Countries", field: "Person.Organisation.orgCountrySet", sortable: true};
    
    this.url = PontusComponent.getRestUrlAg(this.props);
    
    this.setColumnSettings(colSettings);
    // this.setExtraSearch({value: "Organisation"});
    this.setDataType( "Person.Organisation");
    
    
  }
  //
  //
  // getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  // {
  //   this.from = from;
  //   this.to = to;
  //
  //   let sortcolId = sortcol === null ? null : sortcol.id;
  //
  //
  //   let selectBody =
  //     "  .select( " +
  //     "          'Person.Organisation.Short_Name' " +
  //     "         ,'Person.Organisation.Name' " +
  //     "         ,'Person.Organisation.orgCountrySet' " +
  //     "         ,'event_id' " +
  //     "         )";
  //
  //
  //   return {
  //     gremlin: "" +
  //     "g.V().has('Metadata.Type.Person.Organisation',eq('Person.Organisation'))\n" +
  //     "\n" +
  //     " .order()\n" +
  //     " .by(pg_orderCol == null ? 'Person.Organisation.Short_Name' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)\n" +
  //     " .range(pg_from,pg_to)\n" +
  //     " .as('org')\n" +
  //     " .match(\n" +
  //     "   __.as('org').values('Person.Organisation.Short_Name').as('Person.Organisation.Short_Name')\n" +
  //     " , __.as('org').values('Person.Organisation.Name').as('Person.Organisation.Name')\n" +
  //     " , __.as('org').values('Person.Organisation.orgCountrySet').as('Person.Organisation.orgCountrySet')\n" +
  //     " , __.as('org').id().as('event_id')\n" +
  //     " )" +
  //     selectBody
  //     , bindings: {
  //       pg_from: from
  //       , pg_to: to
  //       , pg_orderCol: sortcolId
  //       , pg_orderDir: sortdir
  //     }
  //
  //
  //   };
  // };
  //
  // onError = (err, fromPage, toPage) =>
  // {
  //   // ignore.
  // };
  
  
  
}


export default NavPanelInternationalPVGridRegulators;
