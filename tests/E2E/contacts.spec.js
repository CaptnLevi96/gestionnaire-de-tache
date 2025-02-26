import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('textbox', { name: 'Nom:', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nom:', exact: true }).fill('Levi ');
  await page.getByRole('textbox', { name: 'Prénom:' }).click();
  await page.getByRole('textbox', { name: 'Prénom:' }).fill('Loseke');
  await page.getByRole('textbox', { name: 'Téléphone:' }).click();
  await page.getByRole('textbox', { name: 'Téléphone:' }).fill('514-334-3344');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('Levilo97@outlook.com');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Ajouter' }).click();
  await page.getByRole('button', { name: 'Modifier' }).nth(2).click();
  await page.getByRole('textbox', { name: 'Nom:', exact: true }).dblclick();
  await page.getByRole('textbox', { name: 'Nom:', exact: true }).fill('Robert');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Mettre à jour' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Supprimer' }).nth(2).click();
});