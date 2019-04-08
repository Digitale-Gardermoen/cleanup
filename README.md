# cleanup
This web API is used for deleting folders.
It is meant for a secure way to request what folders need to be deleted for servers that arent connected to the internet.

## Documentation

Click [here](https://app.swaggerhub.com/apis-docs/dotkim/cleanup/2.0.0) for a public swagger documentation page.

Here is a PlantUML diagram to simply tell how things are set up.

![PlantUML](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuG9IcMc9oIKAQPavgSMfHMMfHLo9wQbv9Gg91PbSoVcv1VbvG1vGkYYrF34dXuiBeL11rmukhc2bO69Yp0NZ0gL01a157LBpKe2M0G00)

The main point of this, is that the fileserver is on a comletely different VLAN, that should not be accessed from other VLANs. Instead of opening port 445 from an "insecure" zone, we open a web port from the "secure" zone.

### Protocol

This API uses the HTTPS protocol, that means you'll need to have a signed/self-signed certificate.

### Security

For authorization, basic is what is used.