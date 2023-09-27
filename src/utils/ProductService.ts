export const ProductService = {
  getProductsData() {
    return [
      {
        stateMasterList: null,
        hdrTable: null,
        countryList: null,
        stateList: [
          {
            stateid: 1,
            countryid: 1,
            statename: "TamilNadu",
            statecode: "TN",
            status: 1,
            createdby: 1,
            createdon: "2023-09-05T14:44:04.107",
            modifiedby: 1,
            modifiedon: "2023-09-05T14:44:04.107",
          },
          {
            stateid: 3,
            countryid: 1,
            statename: "ASDASD",
            statecode: "dsasdsd",
            status: 1,
            createdby: 1,
            createdon: "2023-09-05T14:44:04.107",
            modifiedby: 1,
            modifiedon: "2023-09-05T14:44:04.107",
          },
          {
            stateid: 8,
            countryid: 1,
            statename: "kanyakumari",
            statecode: "KI",
            status: 1,
            createdby: 1,
            createdon: "2023-09-05T14:44:04.107",
            modifiedby: 1,
            modifiedon: "2023-09-05T14:44:04.107",
          },
          {
            stateid: 9,
            countryid: 1,
            statename: "Uttar pradesh",
            statecode: "UP",
            status: 1,
            createdby: 1,
            createdon: "2023-09-05T14:44:04.107",
            modifiedby: 1,
            modifiedon: "2023-09-05T14:44:04.107",
          },
          {
            stateid: 10,
            countryid: 1,
            statename: "Andra Pradesh",
            statecode: "AP",
            status: 1,
            createdby: 1,
            createdon: "2023-09-05T14:44:04.107",
            modifiedby: 1,
            modifiedon: "2023-09-05T14:44:04.107",
          },
          {
            stateid: 11,
            countryid: 1,
            statename: "AAA",
            statecode: "TN",
            status: 1,
            createdby: 1,
            createdon: "2023-09-05T14:44:04.107",
            modifiedby: 1,
            modifiedon: "2023-09-05T14:44:04.107",
          },
          {
            stateid: 1006,
            countryid: 1,
            statename: "TamilNadussss",
            statecode: "TN",
            status: 1,
            createdby: 1,
            createdon: "2023-09-05T14:44:04.107",
            modifiedby: 1,
            modifiedon: "2023-09-05T14:44:04.107",
          },
        ],
        transtatus: {
          rusult: true,
          lstErrorItem: [
            {
              errorNo: null,
              message: "SearchInitialize Successfully",
            },
          ],
        },
      },
    ];
  },

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  },

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  },

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  },
};
