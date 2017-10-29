import chai, { expect } from 'chai';
import sinon from 'sinon';
import CarrierController from '../../carrier/carrier.controller';
import CarrierClient from '../../carrier/carrier.client';
import Account from '../../account/account.model';

chai.config.includeStack = true;

describe('# Carrier Controller', () => {
  describe('# GET /api/carriers/types', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should return all Carriers', async () => {
      let result = {};
      const resp = { json: (obj) => { result = obj; } };
      const carriers = [{ name: 'UPS', id: 'ups' }, { name: 'Fedex', id: 'fedex' }, { name: 'USPS', id: 'usps' }];
      sandbox.stub(CarrierClient, 'getCarrierTypes').resolves(carriers);

      await CarrierController.getCarrierTypes({}, resp, {});

      expect(result).to.deep.equal(carriers);
    });

    it('Should return empty list if no carriers', async () => {
      let result = {};
      const resp = { json: (obj) => { result = obj; } };
      const carriers = [];
      sandbox.stub(CarrierClient, 'getCarrierTypes').resolves(carriers);

      await CarrierController.getCarrierTypes({}, resp, {});

      expect(result).to.deep.equal(carriers);
    });

    it('Should call next function if any exception', async () => {
      let errorMessage = '';
      const next = (e) => {
        errorMessage = e.message;
      };

      sandbox.stub(CarrierClient, 'getCarrierTypes').rejects(new Error('Error getting the carriers'));

      await CarrierController.getCarrierTypes({}, {}, next);

      expect(errorMessage).to.equal('Error getting the carriers');
    });
  });

  describe('# POST /api/carriers/account', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should create carrier account if user exists', async () => {
      const account = { prodApiKey: '123456' };
      const carrierAccount = { accountId: 'ca_123', carrier: 'FedEx' };
      const res = { json: obj => obj };
      const req = { body: { logisticoId: '12345' } };

      sandbox.stub(Account, 'findByLogisticoId').resolves(account);
      sandbox.stub(CarrierClient, 'createCarrierAccount').resolves(carrierAccount);

      const result = await CarrierController.createAccount(req, res, {});
      console.log(result);
      expect(result).to.equal(carrierAccount);
    });
  });
});
