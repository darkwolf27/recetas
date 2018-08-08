import { MenuSemanaModule } from './menu-semana.module';

describe('MenuSemanaModule', () => {
  let menuSemanaModule: MenuSemanaModule;

  beforeEach(() => {
    menuSemanaModule = new MenuSemanaModule();
  });

  it('should create an instance', () => {
    expect(menuSemanaModule).toBeTruthy();
  });
});
