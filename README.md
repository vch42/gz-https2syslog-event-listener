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
```
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
│           └── gz-https2syslog-event-listener.service
└── opt
    └── gz-https2syslog-event-listener
        ├── api
        │   ├── config
        │   │   └── config.json.template
        │   └── epsSyslogHelper.js
        ├── certs
        ├── package.json
        └── server.js

9 directories, 11 files
```
<br />
<br />

### How to build and install
```
$ git clone https://github.com/vch42/gz-https2syslog-event-listener.git
$ cd ./gz-https2syslog-event-listener
$ chmod +x ./src/DEBIAN/post* ./src/DEBIAN/pre*
$ rm -f ./src/opt/gz-https2syslog-event-listener/certs/blank
$ version="$(grep "Version" ./src/DEBIAN/control | cut -d' ' -f2)"
$ dpkg-deb --build ./src ../gz-https2syslog-event-listener_"$version".deb
$ cd ..
$ sudo dpkg --install ./gz-https2syslog-event-listener_"$version".deb
$ rm -rf ./gz-https2syslog-event-listener
```


