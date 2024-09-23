import * as authTokens from '../fixtures/token.json';
import * as orderData from '../fixtures/order.json';


const BUN_SELECTOR = `[data-ingredient=bun]`;
const MAIN_SELECTOR = `[data-ingredient=main]`;
const SAUCE_SELECTOR = `[data-ingredient=sauce]`;

describe('Тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Список ингредиентов доступен для выбора', () => {
    cy.get(BUN_SELECTOR).should('have.length.at.least', 1);
    cy.get(MAIN_SELECTOR).should('have.length.at.least', 1);
    cy.get(SAUCE_SELECTOR).should('have.length.at.least', 1);
  });

  it('Открытие модального окна ингредиента и закрытие по клику на крестик', () => {
    cy.get('#modals').children().should('have.length', 0);
    cy.get(`${BUN_SELECTOR}:first-of-type`).click();
    cy.get('#modals').should('have.length', 1);
    cy.get('#modals button:first-of-type').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Закрытие по клику на оверлей', () => {
    cy.get('#modals').children().should('have.length', 0);
    cy.get(`${BUN_SELECTOR}:first-of-type`).click();
    cy.get('#modals>div:nth-of-type(2)').click({ force: true });
    cy.get('#modals').children().should('have.length', 0);
  });
});

// тестируем заказ
describe('Проверка добавления ингридиента в BurgerConstructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', authTokens.accessToken);
    localStorage.setItem('refreshToken', authTokens.refreshToken);
    cy.wait(500);
    cy.visit('/');
    cy.wait('@getUser');
  });

  const burgerCollect ='.constructor-element > .constructor-element__row > .constructor-element__text';
  const commonButton = `.common_button`;

  it('Добавление булок и ингредиентов в заказ', () => {
    cy.request('/api/ingredients');
    cy.get(`${BUN_SELECTOR} > ${commonButton}`).first().click();
    cy.get(`${MAIN_SELECTOR} > ${commonButton}`).first().click();
    cy.get(`${SAUCE_SELECTOR} > ${commonButton}`).first().click();

    const burgerConstructor = {
      bunTop: cy.get(burgerCollect).first(),
      mainIngredient: cy.get(burgerCollect).eq(1),
      sauceIngredient: cy.get(burgerCollect).eq(2),
      bunBottom: cy.get(burgerCollect).last()
    };

    burgerConstructor.bunTop.contains('Краторная булка N-200i (верх)');
    burgerConstructor.mainIngredient.contains(
      'Биокотлета из марсианской Магнолии'
    );
    burgerConstructor.sauceIngredient.contains('Соус Spicy-X');
    burgerConstructor.bunBottom.contains('Краторная булка N-200i (низ)');
  });

  it('Все этапы создания заказа', () => {
    
    cy.get(`${BUN_SELECTOR} > ${commonButton}`).first().click();
    cy.get(`${MAIN_SELECTOR} > ${commonButton}`).first().click();
    cy.get(`${SAUCE_SELECTOR} > ${commonButton}`).first().click();

    cy.get( '#root > div > main > div > section:nth-child(2) > div > button').click();

    const orderModal = cy.get('#modals > div:first-child');
    const orderNumber = orderModal.get('div:nth-child(2) > h2');
  
    orderNumber.contains(orderData.order.number).should('have.text','48808');
    
    orderModal.get('div:first-child > div:first-child > button > svg').click();

    cy.get('#modals').children().should('have.length', 0);

    const burgerCunstructor = {
      constructorBunTop: cy.get('div > section:nth-child(2) > div'),
      constructoMainIngredient: cy.get('div > section:nth-child(2) > ul > div'),
      constructorBunBottom: cy.get(
        'div > section:nth-child(2) > div:nth-child(3)'
      )
    };

    burgerCunstructor.constructorBunTop.contains('Выберите булки');
    burgerCunstructor.constructoMainIngredient.contains('Выберите начинку');
    burgerCunstructor.constructorBunBottom.contains('Выберите булки');
  });
  afterEach(() => {
    cy.clearAllCookies();
    localStorage.removeItem('refreshToken');
  });
})
