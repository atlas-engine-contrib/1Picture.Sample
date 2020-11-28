# 1Picture.Sample

## Setup

### Requirements

1. docker
2. docker-compose

#### Add atlas-authority entry to host file

#### Linux / Mac OS

/etc/hosts:

```
127.0.0.1 atlas-authority
```

#### Windows:

%windir%\system32\drivers\etc\HOSTS

```
127.0.0.1       atlas-authority
```

### Howto use



```docker
docker-compose build
docker-compose up
```

### AtlasPortal:

http://localhost:8082

### AtlasEngine:

http://localhost:8000
