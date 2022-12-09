const parseJwt = require('~/server/middleware/utils/jsonTransform').parseJwt;

const properToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJibVU3VENwazF1Zy1la3BuRzIzdVVPNGt1QmZXTWdTVEFEVnhkXzQwbWpFIn0.eyJleHAiOjE2NzA1NzgxNDYsImlhdCI6MTY3MDU3Nzg0NiwiYXV0aF90aW1lIjoxNjcwNTc3ODQ1LCJqdGkiOiJkNzQwOTE3Yi02MDM0LTQ0OWQtOWFkMC1lY2Q3ZjJjNWE3ZDAiLCJpc3MiOiJodHRwczovL3Nzby5wZmVpZmZlci12YWN1dW0uY29tL2F1dGgvcmVhbG1zL2RldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI4M2JjZDMwZS03NmE2LTQwNGEtODk3NS1lZWQzNjdjYTMwNjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJlY29tbWVyY2UtcHVibGljIiwibm9uY2UiOiIzNTNjYjcwZC00NWIxLTRmZjctOGY2Zi0zZmFmYzE5OWY4OWUiLCJzZXNzaW9uX3N0YXRlIjoiYTE5ZDAwMDYtMGYxZi00ZWM2LTgzZmQtNjQ4NWYyZjc5NWJiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2Rldi5wdmFjLmRpdmEtZS5jb20iLCJodHRwczovL2Rldi12YWN1dW0ud2VzdGV1cm9wZS5jbG91ZGFwcC5henVyZS5jb20iLCJodHRwOi8vbG9jYWxob3N0OjMwMDciLCJodHRwOi8vMC4wLjAuMDozMDAwIiwiaHR0cDovL2xvY2FsaG9zdDoyMDAwIiwiaHR0cDovLzAuMC4wLjA6MjAwMCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMSIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzA5OSIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAxMCIsImh0dHBzOi8vbG9jYWxob3N0OjIwMDAiLCJodHRwczovL2xvY2FsaG9zdDozMDEwIiwiaHR0cHM6Ly9kZXYudmFjdXVtLXNob3AuY29tIiwiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHBzOi8vZGV2Mi5wdmFjLmRpdmEtZS5jb20iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImN1c3RvbWVyX3ZzbSIsImN1c3RvbWVyX2Vjb21tZXJjZSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJpbnRlcm5hbF9sZXZlbF8yIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQ2hyaXN0aW5lIFbDtmxrZWwiLCJncm91cHMiOltdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJjdkBkaXZhLWUuY29tIiwiZ2l2ZW5fbmFtZSI6IkNocmlzdGluZSIsImxvY2FsZSI6ImVuIiwiZmFtaWx5X25hbWUiOiJWw7Zsa2VsIiwiZW1haWwiOiJjdkBkaXZhLWUuY29tIn0.kHvlEAXnObr9UbzBE3fMwexCCE_Em_GfTHKRucLsJ9FtYooc_aRtqgfd4drwEdNYrE3Rvf0LHrxQIVMRuV-OCOMFtxTXI8WSpWe6kWQxim0C5XB_0nPvtBxwht04BYt6vmNUOemqxu2EsEZ8a05N_BxfwtjBsSgVv73qRwK8JRWnrtmLiTSwuf1UsTIU9Z4gRmQ6KSpbN-v2i938-i7E-MqrNkEMrUf9mpwws9HkHPwDVGW82cZ8wQ2e1svRN75j5xWrJfL1gtJinVFhEGDlsAlH6gEPo6gvWTvhyL3ge895w4b_7yTOOh8QMAcbVXL5-SLVbPROArzB-qoiu9gfQQ';

describe('jsonTranform', () => {
  describe('parseJWT', () => {
    test('given null parse JWT should return empty object', async () => {
      const tokenParsed = parseJwt(null);
      expect(tokenParsed).toStrictEqual({});
    });

    test('given empty String JWT should return empty object', async () => {
      const tokenParsed = parseJwt('');
      expect(tokenParsed).toStrictEqual({});
    });

    test('given BasicAuth parse JWT should return empty object', async () => {
      const tokenParsed = parseJwt('Basic alksjdnfjlhalskdgjhaöklehrtljkahdfg');
      expect(tokenParsed).toStrictEqual({});
    });

    test('given Bearer without payload parse JWT should return empty object', async () => {
      jest.spyOn(console, 'warn').mockImplementation()
      const tokenParsed = parseJwt('Bearer . ')
      expect(tokenParsed).toStrictEqual({})
      expect(console.warn).toBeCalledTimes(1)
    });

    test('given proper Token parse JWT should return Object with decoded data', async () => {
      const tokenParsed = parseJwt(properToken);

      expect(tokenParsed).toBeTruthy();
      expect(tokenParsed.typ).toBe('Bearer');
      expect(tokenParsed.azp).toBe('ecommerce-public');
      expect(tokenParsed.realm_access.roles).toContain('internal_level_2');
      expect(tokenParsed.scope).toBe('openid profile email');
      expect(tokenParsed.name).toBe('Christine Völkel');
      expect(tokenParsed.given_name).toBe('Christine');
      expect(tokenParsed.family_name).toBe('Völkel');
      expect(tokenParsed.email).toBe('cv@diva-e.com');
      expect(tokenParsed.locale).toBe('en');
    });
  });
});
