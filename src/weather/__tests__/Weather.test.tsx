import React from 'react';
import WeatherContainer from '../WeatherContainer';
import {MemoryRouter, Route, Switch} from "react-router";
import {render, wait} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {mockErrorResponse, mockNoResponse, mockOkResponse} from "./mocks";
import "@testing-library/jest-dom/extend-expect";

afterEach(() => {
    jest.restoreAllMocks();
});

const setup = (city = '') => {
    const methods = render(
        <MemoryRouter initialEntries={[`/weather/${city}`]}>
            <Switch>
                <Route path="/weather/Another" render={() => (
                    <div>Another city</div>
                )} />
                <Route path="/weather/:city?" component={WeatherContainer} />
            </Switch>
        </MemoryRouter>
    );

    return {
        ...methods,
        input: methods.getByPlaceholderText(/city/i) as HTMLInputElement,
        button: methods.getByText(/get/i),
    };
};

describe('Weather Component', () => {
    describe('without city in path', () => {
        it('should render empty input', () => {
            mockNoResponse();
            const { input } = setup();

            expect(input).toHaveValue("");
        });

        it('should not load the forecast', () => {
            const mock = mockNoResponse();
            setup();

            expect(mock).not.toHaveBeenCalled();
        });
    });

    describe('with city in path', () => {
        it('should render city name in input', () => {
            mockNoResponse();
            const { input } = setup("Warsaw");

            expect(input).toHaveValue("Warsaw");
        });

        it('should load the forecast', () => {
            const mock = mockNoResponse();
            setup('Warsaw');

            expect(mock).toHaveBeenCalled();
        });
    });

    describe('form submit', () => {
        it('should call the API with provided city', async () => {
            const mock = mockNoResponse();
            const { input, button } = setup();

            await userEvent.type(input, 'Warsaw');
            userEvent.click(button);

            await wait();

            expect(mock).toHaveBeenCalled();
            expect(mock.mock.calls[0][0]).toContain("Warsaw");
        });

        it('should change page url to contain city name', async () => {
            mockNoResponse();
            const { input, button, getByText } = setup();

            await userEvent.type(input, 'Another');
            userEvent.click(button);

            expect(getByText("Another city")).toBeInTheDocument();
        });
    });

    describe('forecast loading', () => {
        it('should disable the form', async () => {
            mockNoResponse();
            const { input, button } = setup();

            await userEvent.type(input, 'Warsaw');
            userEvent.click(button);

            await wait();

            expect(input).toBeDisabled();
            expect(button).toBeDisabled();
        });

        it('should display spinner', async () => {
            mockNoResponse();
            const { input, button, queryByTestId } = setup();

            await userEvent.type(input, 'Warsaw');
            userEvent.click(button);

            await wait();

            const spinner = queryByTestId('spinner');
            expect(spinner).toBeInTheDocument();
        });
    });

    describe('forecast loaded', () => {
        it('should enable the form', async () => {
            mockOkResponse();
            const { input, button } = setup('Warsaw');

            await wait();

            expect(input).toBeEnabled();
            expect(button).toBeEnabled();
        });

        it('should hide the spinner', async () => {
            mockOkResponse();
            const { queryByTestId } = setup('Warsaw');

            await wait();

            const spinner = queryByTestId('spinner');
            expect(spinner).not.toBeInTheDocument();
        });

        it('should display error on failure', async () => {
            mockErrorResponse();
            const { queryByRole } = setup('Warsaw');

            await wait();

            const error = queryByRole('alert');
            expect(error).toBeInTheDocument();
        });

        it('should display data on success', async () => {
            mockOkResponse();
            const { getByText } = setup('Warsaw');

            await wait();

            expect(getByText(/293\.25/)).toBeInTheDocument();
            expect(getByText(/1019/)).toBeInTheDocument();
            expect(getByText(/83/)).toBeInTheDocument();
        });
    });
});
