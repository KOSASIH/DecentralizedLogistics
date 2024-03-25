const {
  generateDID,
  generateDIDDocument,
  generateDIDResolutionMetadata,
  generateDIDDocumentStream,
  resolveDID,
  resolveDIDRepresentation,
} = require('./technicalSpecifications');

describe('Technical Specifications', () => {
  describe('generateDID', () => {
    it('should generate a new DID', () => {
      const did = generateDID();
      expect(did).toMatch(/did:[a-zA-Z0-9]+:[a-zA-Z0-9]+/);
    });
  });

  describe('generateDIDDocument', () => {
    it('should generate a DID document with verification method and authentication', () => {
      const did = 'did:example:123';
      const didDocument = generateDIDDocument(did);
      expect(didDocument.id).toEqual(did);
      expect(didDocument.verificationMethod.length).toBeGreaterThan(0);
      expect(didDocument.authentication.length).toBeGreaterThan(0);
    });
  });

  describe('generateDIDResolutionMetadata', () => {
    it('should generate a DID resolution metadata with did, verificationMethod, and authentication', () => {
      const did = 'did:example:123';
      const didDocument = generateDIDDocument(did);
      const didResolutionMetadata = generateDIDResolutionMetadata(didDocument);
      expect(didResolutionMetadata.id).toEqual(did);
      expect(didResolutionMetadata.verificationMethod).toEqual(didDocument.verificationMethod);
      expect(didResolutionMetadata.authentication).toEqual(didDocument.authentication);
    });
  });

  describe('generateDIDDocumentStream', () => {
    it('should generate a DID document stream', () => {
      const did = 'did:example:123';
      const didDocument = generateDIDDocument(did);
      const didDocumentStream = generateDIDDocumentStream(didDocument);
      expect(typeof didDocumentStream).toEqual('object');
      expect(didDocumentStream.toString()).toEqual(JSON.stringify(didDocument));
    });
  });

  describe('resolveDID', () => {
    it('should resolve a DID to a DID document', async () => {
      const did = 'did:example:123';
      const resolutionOptions = {
        DIDResolutionResult: {
          didDocumentMetadata: null,
        },
      };

      const result = await resolveDID(did, resolutionOptions);

      expect(result.didResolutionMetadata.id).toEqual(did);
      expect(result.didDocument.id).toEqual(did);
      expect(result.didDocument.verificationMethod.length).toBeGreaterThan(0);
      expect(result.didDocument.authentication.length).toBeGreaterThan(0);
    });

    it('should return notFound error when DID document is not found', async () => {
      const did = 'did:example:456';
      const resolutionOptions = {
        DIDResolutionResult: {
          didDocumentMetadata: null,
        },
      };

      const result = await resolveDID(did, resolutionOptions);

      expect(result.didResolutionMetadata.error).toEqual('notFound');
      expect(result.didDocument).toBeNull();
      expect(result.didDocumentMetadata).toBeNull();
    });
  });

  describe('resolveDIDRepresentation', () => {
    it('should resolve a DID representation', async () => {
      const did = 'did:example:123';
      const resolutionOptions = {
        DIDResolutionResult: {
          didDocumentMetadata: null,
        },
      };

      const result = await resolveDIDRepresentation(did, resolutionOptions);

      expect(result.didResolutionMetadata.id).toEqual(did);
      expect(result.didDocumentStream.toString()).toEqual(JSON.stringify(result.didDocument));
      expect(result.didDocumentMetadata).toBeNull();
    });

    it('should return notFound error when DID document is not found',async () => {
      const did = 'did:example:456';
      const resolutionOptions = {
        DIDResolutionResult: {
          didDocumentMetadata: null,
        },
      };

      const result = await resolveDIDRepresentation(did, resolutionOptions);

      expect(result.didResolutionMetadata.error).toEqual('notFound');
      expect(result.didDocumentStream).toBeNull();
      expect(result.didDocumentMetadata).toBeNull();
    });
  });
});
