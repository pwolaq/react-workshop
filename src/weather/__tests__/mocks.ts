export const mockNoResponse = () => jest
    .spyOn(global as any, 'fetch')
    .mockImplementation(() => new Promise(() => {}));

export const mockOkResponse = () => jest
    .spyOn(global as any, 'fetch')
    .mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
                "main": {
                    "temp": 293.25,
                    "pressure": 1019,
                    "humidity": 83,
                    "temp_min": 289.82,
                    "temp_max": 295.37
                }
            }
        )
    }));

export const mockErrorResponse = () => jest
    .spyOn(global as any, 'fetch')
    .mockImplementation(() => Promise.resolve({
        ok: false
    }));
