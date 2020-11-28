BEGIN TRANSACTION;

INSERT INTO "ClientRedirectUris" ("Id","RedirectUri","ClientId")
  VALUES (4,'http://localhost:8082/signin-oidc',2);

INSERT INTO "ClientPostLogoutRedirectUris" ("Id","PostLogoutRedirectUri","ClientId")
  VALUES (4,'http://localhost:8082/signout-oidc',2);

INSERT INTO "ClientGrantTypes" ("Id","GrantType","ClientId")
  VALUES (6,'implicit',2);

INSERT INTO "ClientCorsOrigins" ("Id","Origin","ClientId")
  VALUES (1,'http://localhost:8082',2);

INSERT INTO "Clients" ("Id","Enabled","ClientId","ProtocolType","RequireClientSecret","ClientName","Description","ClientUri","LogoUri","RequireConsent","AllowRememberConsent","AlwaysIncludeUserClaimsInIdToken","RequirePkce","AllowPlainTextPkce","RequireRequestObject","AllowAccessTokensViaBrowser","FrontChannelLogoutUri","FrontChannelLogoutSessionRequired","BackChannelLogoutUri","BackChannelLogoutSessionRequired","AllowOfflineAccess","IdentityTokenLifetime","AllowedIdentityTokenSigningAlgorithms","AccessTokenLifetime","AuthorizationCodeLifetime","ConsentLifetime","AbsoluteRefreshTokenLifetime","SlidingRefreshTokenLifetime","RefreshTokenUsage","UpdateAccessTokenClaimsOnRefresh","RefreshTokenExpiration","AccessTokenType","EnableLocalLogin","IncludeJwtId","AlwaysSendClientClaims","ClientClaimsPrefix","PairWiseSubjectSalt","Created","Updated","LastAccessed","UserSsoLifetime","UserCodeType","DeviceCodeLifetime","NonEditable")
  VALUES (2,1,'atlasui','oidc',0,'Atlas UI',NULL,NULL,NULL,0,1,0,1,0,0,1,NULL,1,NULL,1,0,300,NULL,3600,300,NULL,2592000,1296000,0,0,1,0,1,0,0,'',NULL,'2020-09-10 06:55:54.7152918',NULL,NULL,NULL,NULL,300,0);

INSERT INTO "ClientScopes" ("Id", "Scope", "ClientId")
  VALUES ('19', 'test_resource', '2'),
  ('20', 'profile', '2'),
  ('21', 'openid', '2');

INSERT INTO "Roles" ("Id", "Name", "Description")
  VALUES ('admin_role', 'Admin', ''),
  ('kunde_role', 'Kunde', ''),
  ('bibliothekar_role', 'Bibliothekar', '');

INSERT INTO "RolePermissions" ("Id", "RoleId", "ClaimType", "ClaimValue")
  VALUES (1, 'admin_role', 'can_read_process_model', ''),
  ( 2, 'admin_role', 'can_write_process_model', ''),
  ( 3, 'admin_role', 'can_delete_process_model', ''),
  ( 4, 'admin_role', 'can_read_cronjob_history', ''),
  ( 5, 'admin_role', 'can_trigger_messages', ''),
  ( 6, 'admin_role', 'can_trigger_signals', ''),
  ( 7, 'admin_role', 'can_subscribe_to_events', ''),
  ( 8, 'admin_role', 'can_access_external_tasks', ''),
  ( 9, 'admin_role', 'can_terminate_process', ''),
  (10, 'admin_role', 'can_manage_process_instances', ''),
  (11, 'admin_role', 'can_retry_process_instance', ''),

  (12, 'kunde_role', 'can_read_process_model', ''),
  (13, 'kunde_role', 'can_subscribe_to_events', ''),
  (14, 'kunde_role', 'can_access_external_tasks', ''),

  (15, 'bibliothekar_role', 'can_read_process_model', ''),
  (16, 'bibliothekar_role', 'can_subscribe_to_events', ''),
  (17, 'bibliothekar_role', 'can_access_external_tasks', '');

INSERT INTO "Users" ("Id", "UserName", "IsActive", "PasswordHash", "PasswordSalt", "AccessFailedCount")
  VALUES ('admin', 'admin', '1', 'V8u9v6QDPG5m5UsQUHebs0Nn', '74E50iTOzKUxfMF3eycbUypfx2lFrsjk', 0),
  ('Kunde', 'Kunde', '1', 'V8u9v6QDPG5m5UsQUHebs0Nn', '74E50iTOzKUxfMF3eycbUypfx2lFrsjk', 0),
  ('Bibliothekar', 'Bibliothekar', '1', 'V8u9v6QDPG5m5UsQUHebs0Nn', '74E50iTOzKUxfMF3eycbUypfx2lFrsjk', 0);

INSERT INTO "UserRoleMappings" ("UserId", "RoleId")
  VALUES ('admin', 'admin_role'),
  ('Kunde', 'kunde_role'),
  ('Bibliothekar', 'bibliothekar_role');

COMMIT;
