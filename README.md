# gz-https2syslog-event-listener

<br />
Simple nodejs client service that listens for authenticated HTTPS POST requests from GravityZone Cloud and forwards each row in the configured local or remote syslog.<br />
Can be used to receive and forward GravityZone Cloud Push Events to SIEMs which do not have a native HTTPS listener, but are capable of ingesting events via syslog.<br />
<br />
This package is based of this Bitdefender GravityZone KB article (but does not implement it verbatim): <br />
https://www.bitdefender.com/support/sending-events-from-gravityzone-cloud-to-siems-lacking-https-listeners-2373.html <br />
<br />
Bitdefender GravityZone Cloud Push Events documentation: <br />
http://download.bitdefender.com/business/API/Bitdefender_GravityZone_Cloud_APIGuide_forPartners_enUS.pdf#page=185<br />
<br />
<br />

### Improvments:
* dependencies handling at install time (both deb and nodejs via npm)
* installs as a service
* service runs under dedicated low privilege user/group
* generates a default config and self-signed cert, if found missing
* upgrade mechanism (will not overwrite an existing valid configuration)

<br />

### Contents:
.
├── DEBIAN
│   ├── control
│   ├── md5sums
│   ├── postinst
│   ├── postrm
│   ├── preinst
│   └── prerm
├── lib
│   └── systemd
│       └── system
│           └── gz-siem-collector.service
└── opt
    └── gz-siem-collector
        ├── api
        │   ├── config
        │   │   └── config.json.template
        │   └── epsSyslogHelper.js
        ├── certs
        ├── package.json
        └── server.js

9 directories, 11 files
<br />
<br />


