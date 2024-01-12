import axios from 'axios';

export default {
  // BASE_URL: "http://10.39.48.255:8888/HrsmApplication/",   // DEVELOPMENT
  // BASE_URL: 'https://api.bagicuat.bajajallianz.com/BagicHRSM/', // UAT
  BASE_URL: 'https://webapi.bajajallianz.com/BagicHRSM/', // PROD
  // BASE_URL: 'http://10.39.48.255:8888/BagicHRSM/',
  // TIMESHEET_URL: 'https://webservicesdev.bajajallianz.com/BagicWapPrime/pdfApi/userConfigure',
  TIMESHEET_URL: 'https://webservicesdev.bajajallianz.com/BagicVisitorAppWs/userTimeSheet',
  // TIMESHEET_URL: 'http://10.39.48.141:8085/BagicWapPrime/pdfApi/userConfigure',

  login(loginReq) {
    console.log('function->', 'login');
    console.log('url->', `${this.BASE_URL}login`);
    console.log('request->', loginReq);

    return axios.post(`${this.BASE_URL}login`, loginReq);
  },

  getEmpListVendor(getEmpListVendorReq) {
    console.log('function->', 'getEmpListPartner');
    console.log('url->', `${this.BASE_URL}getEmpListPartner`);
    console.log('request->', getEmpListVendorReq);

    return axios.post(`${this.BASE_URL}getEmpListPartner`, getEmpListVendorReq);
  },

  getEmpListTeamLead(getEmpListTLReq) {
    console.log('function->', 'getEmpListTeamLead');
    console.log('url->', `${this.BASE_URL}getEmpListTL`);
    console.log('request->', getEmpListTLReq);
    return axios.post(`${this.BASE_URL}getEmpListTL`, getEmpListTLReq);
  },

  getEmpListManager(getEmpListManagerReq) {
    console.log('function->', 'getEmpListManager');
    console.log('url->', `${this.BASE_URL}getEmpListSM`);
    console.log('request->', getEmpListManagerReq);

    return axios.post(`${this.BASE_URL}getEmpListSM`, getEmpListManagerReq);
  },

  getEmpListItSpoc(getEmpListItSpocReq) {
    console.log('function->', 'getEmpListItSpoc');
    console.log('url->', `${this.BASE_URL}getEmpListITS`);
    console.log('request->', getEmpListItSpocReq);

    return axios.post(`${this.BASE_URL}getEmpListITS`, getEmpListItSpocReq);
  },

  saveEmployeeData(saveEmployeeReq) {
    console.log('function->', 'saveEmployeeData');
    console.log('url->', `${this.BASE_URL}saveEmployee`);
    console.log('request->', saveEmployeeReq);
    console.log('response->', 'Response');

    return axios.post(`${this.BASE_URL}saveEmployee`, saveEmployeeReq);
  },
  updateEmployeeData(updateEmployeeReq) {
    console.log('function->', 'updateEmployee');
    console.log('url->', `${this.BASE_URL}updateEmployee`);
    console.log('request->', updateEmployeeReq);
    console.log('response->', 'Response');

    return axios.post(`${this.BASE_URL}updateEmployee`, updateEmployeeReq);
  },
  viewEmployeeData(viewEmployeeReq) {
    console.log('function->', 'viewEmployeeData');
    console.log('url->', `${this.BASE_URL}getEmployee`);
    console.log('request->', viewEmployeeReq);
    console.log('response->', 'Response');

    return axios.post(`${this.BASE_URL}getEmployee`, viewEmployeeReq);
  },
  getReportingList() {
    const data = {};
    console.log('function->', 'getTeamLeads');
    console.log('url->', `${this.BASE_URL}getRAs`);

    return axios.get(`${this.BASE_URL}getRAs`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  },

  getMainVerticals(RequestMainVertical) {
    console.log('function->', 'getMainVerticals');
    console.log('url->', `${this.BASE_URL}getLists`);

    console.log('data->', RequestMainVertical);

    return axios.post(`${this.BASE_URL}getLists`, RequestMainVertical);
  },
  getSubVerticals(RequestSubVertical) {
    console.log('function->', 'getMainVerticals');
    console.log('url->', `${this.BASE_URL}getLists`);

    console.log('data->', RequestSubVertical);

    return axios.post(`${this.BASE_URL}getLists`, RequestSubVertical);
  },
  getDepartments(RequestDepartment) {
    console.log('function->', 'getMainVerticals');
    console.log('url->', `${this.BASE_URL}getLists`);

    console.log('data->', RequestDepartment);

    return axios.post(`${this.BASE_URL}getLists`, RequestDepartment);
  },
  getFunctions(RequestFunctions) {
    console.log('function->', 'getFunctions');
    console.log('url->', `${this.BASE_URL}getLists`);

    console.log('data->', RequestFunctions);

    return axios.post(`${this.BASE_URL}getLists`, RequestFunctions);
  },
  getProjects(RequestProjects) {
    console.log('function->', 'getProjects');
    console.log('url->', `${this.BASE_URL}getLists`);

    console.log('data->', RequestProjects);

    return axios.post(`${this.BASE_URL}getLists`, RequestProjects);
  },
  getInvoice(RequestInvoice) {
    console.log('function->', 'getProjects');
    console.log('url->', `${this.BASE_URL}getLists`);

    console.log('data->', RequestInvoice);

    return axios.post(`${this.BASE_URL}getLists`, RequestInvoice);
  },
  getDashBoardData(RequestInvoice) {
    console.log('function->', 'getDashBoardData');
    console.log('url->', `${this.BASE_URL}dashBoard`);

    console.log('data->', RequestInvoice);

    return axios.post(`${this.BASE_URL}dashBoard`, RequestInvoice);
  },
  getTLBySM(RequestTeamLead) {
    console.log('function->', 'getTLBySM');
    console.log('url->', `${this.BASE_URL}getTLBySM`);
    console.log('data->', RequestTeamLead);
    return axios.post(`${this.BASE_URL}getTLBySM`, RequestTeamLead);
  },
  getDashBoardForSM(RequestSeniorManager) {
    console.log('function->', 'getDashBoardForSM');
    console.log('url->', `${this.BASE_URL}getDashBoardForSM`);
    console.log('data->', RequestSeniorManager);
    return axios.post(`${this.BASE_URL}getDashBoardForSM`, RequestSeniorManager);
  },

  //   return axios.get(`${this.BASE_URL}getAllAssets`,
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Auth': `Bearer ${token}`,
  //     },
  //     data,
  //   }
  // );

  getDashBoardForPartner() {
    console.log('function->', 'getDashBoardForPartner');
    console.log('url->>>>', `${this.BASE_URL}getDashBoardForPartner`);
    // const data = {};
    return axios.get(`${this.BASE_URL}getDashBoardForPartner`, {
      headers: {
        'x-api-key': 'dMl4O7HULk2Nr0aW7Pu8g1jJSHIlUlat9BQZBeZq',
      },
    });
  },
  generateOnBoardingTicket() {
    return axios.get(`http://sapphireuat.bajajallianz.com/SapphireIMS/api/ticket/create`, {
      headers: {
        key: '036d2095-6803-485a-933e-5a0b256d50ee',
        token: '73738cb1-42a4-491b-9445-b46112799310',
      },
    });
  },

  partnerLogin(loginReq) {
    console.log('function->', 'login');
    console.log('url->', `${this.BASE_URL}login`);
    console.log('request->', loginReq);

    return axios.post(`${this.BASE_URL}partnerLogin`, loginReq);
  },

  signUp(signUpReq) {
    console.log('function->', 'signup');
    console.log('url -> ', `${this.BASE_URL}signUp`);
    console.log('request', signUpReq);
    return axios.post(`${this.BASE_URL}signUp`, signUpReq);
  },

  getTimeSheetDetails(atsReq) {
    console.log('function->', 'getTimeSheetDetails');
    console.log('url -> ', `${this.TIMESHEET_URL}`);
    console.log('request', atsReq);
    return axios.post(`${this.TIMESHEET_URL}`, atsReq);
  }
};
