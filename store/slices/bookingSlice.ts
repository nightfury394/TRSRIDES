import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Location = {
  address: string;
  lat?: number;
  lng?: number;
};

type BookingState = {
  serviceType: "chauffeur" | "logistics" | "rental";
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  pickupDate: string | null;
  pickupTime: string | null;
  fare: number;
};

const initialState: BookingState = {
  serviceType: "chauffeur",
  pickupLocation: null,
  dropoffLocation: null,
  pickupDate: null,
  pickupTime: null,
  fare: 0,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (
      state,
      action: PayloadAction<Partial<BookingState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
