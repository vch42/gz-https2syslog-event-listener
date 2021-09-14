# gz-https2syslog-event-listener

<br />
Simple nodejs client service that listens for authenticated HTTPS POST requests from GravityZone Cloud and forwards each row in the configured local or remote syslog.<br />
Can be used to receive and forward GravityZone Cloud Push Events to SIEMs which do not have a native HTTPS listener, but are capable of ingesting events via syslog.<br />
<br />
This package is based of this GravityZone Bitdefender KB article (but does not replicate it verbatim): <br />
https://www.bitdefender.com/support/sending-events-from-gravityzone-cloud-to-siems-lacking-https-listeners-2373.html <br />
<br />
Bitdefender GravityZone Cloud Push Events documentation: <br />
http://download.bitdefender.com/business/API/Bitdefender_GravityZone_Cloud_APIGuide_forPartners_enUS.pdf#page=185<br />
