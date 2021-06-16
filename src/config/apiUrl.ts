export const base = "https://port3002.fieldproxy.com";
// export const base = "http://localhost:3002";

export const host = `${base}/v2/adminpanel`;

export const ApiUrl = {
  // auth
  signIn: `${host}/signin`,
  signOut: `${host}/signout`,
  companyData: `${base}/compData`,
  getOrganizations: `${host}/getOrganizations`,
  getPrimaryResponse: `${host}/getPrimaryResponse`,
  organizationDetail: `${host}/getOrganization`,
  updateOrganization: `${host}/updateOrganization`,
  getLeadDetails: `${host}/getLeadDetails`,
  deviceDetails: `${host}/deviceDetails`,
  getWorkflowAndTaskList: `${host}/getWorkflowAndTaskList`,
  getDeletableResponsesCount: `${host}/getDeletableResponsesCount`,
  secureDeleteResponses: `${host}/secureDeleteResponses`,
  getCatalogCount: `${host}/getCatalogCount`,
  deleteAllCatalogueData: `${host}/deleteAllCatalogueData`,
  managerDetails: `${host}/getManagerDetails`
};
