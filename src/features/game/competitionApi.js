import { apiSlice } from "../api/apiSlice";

export const competitionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompetitionLeaderBoard: builder.query({
      query: ({ date }) => ({
        url: `/competition/leaderBoard`,
        method: "POST",
        body: { date },
      }),
    }),
  }),
});

export const { useGetCompetitionLeaderBoardQuery } = competitionApi;
