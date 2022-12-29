export type ITMDBWatchProvider = {
    provider_id: number,
    provider_name: string
}

export type DK = {
    buy: ITMDBWatchProvider[] | undefined,
    flatrate: ITMDBWatchProvider[] | undefined,
    rent: ITMDBWatchProvider[] | undefined,
} | undefined

export type ITMDBWatchProviders = {
    id: number,
    results: {
        DK: DK
    }
}
