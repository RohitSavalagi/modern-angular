import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightSearch } from './flight-search';
import { provideRouter } from '@angular/router';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { page } from 'vitest/browser';
import { provideTestConfig } from '../../../../testing/provide-test-config';
import { FlightStore } from './flight-store';
import { createTestFlight } from '../../../../testing/create-test-flight';

describe('flight-search', () => {
  let component: FlightSearch;
  let fixture: ComponentFixture<FlightSearch>;
  let ctrl: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSearch],
      providers: [provideRouter([]), provideHttpClientTesting(), provideTestConfig()],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearch);
    component = fixture.componentInstance;

    ctrl = TestBed.inject(HttpTestingController);

    // Await initial data loading
    const request = await vi.waitFor(() => ctrl.expectOne('/flight?from=Graz&to=Hamburg'), {
      interval: 50,
      timeout: 1000,
    });

    request.flush([]);
  });

  afterEach(() => {
    const pending = ctrl.match(() => true);

    console.log(pending.map((r) => r.request.urlWithParams));
    ctrl.verify();
  });

  it('Can be created', () => {
    expect(component).not.toBeUndefined();
  });

  it('Disables search button when from and to are not given', async () => {
    await page.getByLabelText('From').fill('');
    await page.getByLabelText('To').fill('');

    const button = page.getByRole('button', { name: 'Search' });
    console.log(button);
    await expect.element(button).toBeDisabled();
  });

  it('searches for flights when from and to are provided', async () => {
    const flightStore = TestBed.inject(FlightStore);

    vi.spyOn(flightStore, 'updateFilter');

    await page.getByLabelText('From').fill('Paris');
    await page.getByLabelText('To').fill('London');

    const button = page.getByRole('button', { name: 'Search' });
    await button.click();

    await vi.waitFor(() => ctrl.expectOne('/flight?from=Paris&to=Hamburg'));

    const final = await vi.waitFor(() => ctrl.expectOne('/flight?from=Paris&to=London'));
    final.flush([createTestFlight(1), createTestFlight(2), createTestFlight(3)]);

    const headings = page.getByRole('heading', {
      name: 'Paris - London',
    });

    await expect.element(headings).toHaveLength(3);

    expect(flightStore.updateFilter).toBeCalled();
    // expect(flightStore.updateFilter).toBeCalledTimes(1);
    expect(flightStore.updateFilter).toBeCalledWith('Paris', 'London');
    // expect(flightStore.reload).toBeCalled();
  });
});
