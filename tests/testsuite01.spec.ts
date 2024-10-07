import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page.ts';
import { DashboardPage } from './pages/dashboard-page.ts';
import { ClientsPage } from './pages/clients-page.ts';
import { CreateClientsPage } from './pages/createclients-page.ts';

test.describe('Test suite 01', () => {
  test('Test case 01 testing the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await expect(dashboardPage.logoutButton).toBeEnabled();
    await expect(dashboardPage.logoutButton).toHaveText('Logout');
    await expect(dashboardPage.logoutButton).toBeVisible();
    await dashboardPage.inRooms();
    await expect(dashboardPage.backButton).toBeEnabled();
    await expect(dashboardPage.backButton).toHaveText('Back');
    await expect(dashboardPage.backButton).toBeVisible();
    await dashboardPage.backOutButton();
    await dashboardPage.inClients();
    await expect(dashboardPage.backButton).toBeEnabled();
    await expect(dashboardPage.backButton).toHaveText('Back');
    await expect(dashboardPage.backButton).toBeVisible();
    await dashboardPage.backOutButton();
    await dashboardPage.inBills();
    await expect(dashboardPage.backButton).toBeEnabled();
    await expect(dashboardPage.backButton).toHaveText('Back');
    await expect(dashboardPage.backButton).toBeVisible();
    await dashboardPage.backOutButton();
    await dashboardPage.inReservations();
    await expect(dashboardPage.backButton).toBeEnabled();
    await expect(dashboardPage.backButton).toHaveText('Back');
    await expect(dashboardPage.backButton).toBeVisible();
    await dashboardPage.backOutButton();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});

test.describe('Test suite 01', () => {
  test('Test case 02 create a client and save it', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);
    const createClientsPage = new CreateClientsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inClients();
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible();
    await expect(clientsPage.createClientButton).toBeEnabled();
    await expect(clientsPage.createClientButton).toHaveText('Create Client');
    await expect(clientsPage.createClientButton).toBeVisible();
    await clientsPage.perfromCreateClient();
    await createClientsPage.perfromFillClient();
    await expect(createClientsPage.nameTextField).toBeEditable;
    await expect(createClientsPage.emailTextField).toBeEditable;
    await expect(createClientsPage.phoneNumber).toBeEditable;
    await expect(page.getByRole('heading', { name: 'New Client' })).toBeVisible();
    await expect(page.locator('div.field:nth-child(1) > label:nth-child(1)')).toBeVisible(); //To see if this element is visible
    await expect(page.locator('div.field:nth-child(1) > label:nth-child(1)')).toHaveText('Name'); //To see if the word 'Name' is above the name text box
    await expect(page.locator('div.field:nth-child(2) > label:nth-child(1)')).toBeVisible(); //To see if element is visible
    await expect(page.locator('div.field:nth-child(2) > label:nth-child(1)')).toHaveText('Email'); //To see if the word 'Email' is above the email text box
    await expect(page.locator('div.field:nth-child(3) > label:nth-child(1)')).toBeVisible(); //To see if this element is visible
    await expect(page.locator('div.field:nth-child(3) > label:nth-child(1)')).toHaveText('Telephone') //To see if the word 'Telephone' is above the telephone text box
    await createClientsPage.saveClient();
    await expect(page.locator('div.card:nth-child(3)')).toBeVisible();
    await dashboardPage.backOutButton();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();


  });
});