/**
 * Created by thuanle on 1/8/2016.
 */
var nedbProperties=require('./../properties/NedbProperties.json');
module.exports={
    status:"App is running on production environment",
    db:nedbProperties.dataStore.production
}