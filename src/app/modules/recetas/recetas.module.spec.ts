import { RecetasModule } from './recetas.module';

describe('RecetasModule', () => {
  let recetasModule: RecetasModule;

  beforeEach(() => {
    recetasModule = new RecetasModule();
  });

  it('should create an instance', () => {
    expect(recetasModule).toBeTruthy();
  });
});
