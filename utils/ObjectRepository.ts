/**
 * Centralized Object Repository for all Salesforce locators
 * Contains all selectors used across test cases TC01-TC04
 */
export const ObjectRepository = {
    // Common Locators (Used across multiple pages)
    Common: {
        viewProfileButton: 'button[title="View profile"]',
        moreActionsButton: 'button[title="Show more actions"]',
        saveButton: 'button[name="Save"]',
        closeButton: 'button[title="Close"]',
        nextButton: 'button[name="Next"]',
        cancelButton: 'button[name="Cancel"]',
        searchInput: 'input.slds-input[type="search"]',
        toastMessage: '//div[contains(@class, "toastMessage")]',
        errorMessage: '//div[contains(@class, "error")]',
        loadingSpinner: '//div[contains(@class, "slds-spinner")]'
    },

    // Login and Authentication Related Locators
    LoginPage: {
        usernameInput: '#username',
        passwordInput: '#password',
        loginButton: '#Login',
        viewProfileButton: 'button[title="View profile"]',
        logoutLink: 'a[href*="logout"]',
        rememberMeCheckbox: '#rememberUn',
        forgotPasswordLink: '#forgot_password_link',
        errorMessage: '#error'
    },

    // Accounts Related Locators
    AccountsPage: {
        accountsTab: 'a[title="Accounts"]',
        searchButton: 'button.slds-button.slds-button_neutral.search-button',
        searchInput: 'input.slds-input[type="search"]',
        moreActionsButton: 'button[title="Show more actions"]',
        newButton: '//div[text()="New"]',
        accountListItem: (accountName: string) => `//a[contains(text(), '${accountName}')]`,
        accountOwnerField: '//span[text()="Account Owner"]//following::a[1]',
        deleteButton: '//button[@name="Delete"]',
        confirmDeleteButton: '//button[@title="Delete"]',
        accountTypeDropdown: '//label[text()="Account Type"]/following::button[1]'
    },

    // Account Reassignment Related Locators
    AccountReassignmentPage: {
        moreActionsButton: "button[title='Show more actions']",
        reassignButton: "//span[text()='Submit Request for Account Reassignment']",
        recipientInput: "//input[@placeholder='Search Users...']",
        submitButton: "//button[text()='Submit']",
        ownerField: "//span[text()='Owner']//following::a[1]",
        successMessage: "//div[contains(@class, 'forceVisualMessageQueue')]//div[contains(@class, 'success')]",
        requestStatus: "//span[text()='Request Status']//following::span[1]",
        reasonInput: "//div[@class='uiInput uiInputText uiInput--default uiInput--input']/input",
        userSearchInput: "//input[@placeholder='Search People...']",
        userOption: (userName: string) => `//a[contains(text(), '${userName}')]`,
        commentInput: "//textarea[@placeholder='Add your comments here']"
    },


    // Leads Related Locators
    LeadsPage: {
        leadsTab: "a[title='Leads']",
        newLeadButton: "//div[text()='New']",
        leadNameInput: "//input[@name='Name']",
        leadStatusDropdown: "//button[@aria-label='Lead Status']",
        campaignHistoryButton: "//button[contains(@title, 'Show Campaign History')]",
        addToCampaignButton: "//button[text()='Add to Campaign']",
        searchCampaignInput: "//input[@placeholder='Search Campaigns...']",
        campaignOption: (campaignName: string) => `//a[contains(text(), '${campaignName}')]`,
        memberStatusDropdown: "//button[@aria-label='Member Status']",
        campaignMemberStatus: (status: string) => `//lightning-base-combobox-item[@data-value='${status}']`,
        saveCampaignButton: "//button[@name='SaveEdit']",
        cancelButton: "//button[@name='Cancel']",
        errorMessageToast: "//div[contains(@class, 'forceToastMessage')]//div[contains(@class, 'errorContainer')]"
    },

    // Setup and Admin Related Locators
    SetupPage: {
        quickFindInput: "//input[@title='Search Setup']",
        userFrameLocator: 'iframe[title="User: Neha Verma ~ Salesforce - Unlimited Edition"]',
        loginButton: "button[name='login']",
        logoutLink: "a[href*='logout']",
        setupLink: "//a[@title='Setup']",
        usersOption: "//a[@title='Users']",
        userSearchBox: "//input[@placeholder='Search Setup']",
        userRow: (userName: string) => `//span[@title='${userName}']`,
        loginAsUserButton: "//button[contains(text(), 'Login')]",
        logoutAsUserLink: (userName: string) => `//a[contains(text(), 'Log out as ${userName}')]`
    },

    // Campaign Related Locators
    CampaignPage: {
        campaignsTab: "a[title='Campaigns']",
        newCampaignButton: "//div[text()='New']",
        campaignNameInput: "//input[@name='Name']",
        startDateInput: "//input[@name='StartDate']",
        endDateInput: "//input[@name='EndDate']",
        typeDropdown: "//button[@aria-label='Type']",
        statusDropdown: "//button[@aria-label='Status']",
        budgetedCostInput: "//input[@name='BudgetedCost']",
        expectedRevenueInput: "//input[@name='ExpectedRevenue']",
        campaignMembersList: "//div[contains(@class, 'campaignMemberList')]",
        addMembersButton: "//button[text()='Add Members']"
    }
};
