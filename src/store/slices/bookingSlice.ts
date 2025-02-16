import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Location = {
  lat: number;
  lng: number;
  address: string;
};

type BookingState = {
  serviceType: "chauffeur" | "logistics" | "rental";
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  pickupDate: string;
  pickupTime: string;
  extraTime: number;
  transferType: "oneWay" | "return";
  fare: number;
};

const initialState: BookingState = {
  serviceType: "chauffeur",
  pickupLocation: null,
  dropoffLocation: null,
  pickupDate: "",
  pickupTime: "",
  extraTime: 0,
  transferType: "oneWay",
  fare: 0,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setServiceType: (
      state,
      action: PayloadAction<BookingState["serviceType"]>
    ) => {
      state.serviceType = action.payload;
    },
    setPickupLocation: (state, action: PayloadAction<Location>) => {
      state.pickupLocation = action.payload;
    },
    setDropoffLocation: (state, action: PayloadAction<Location>) => {
      state.dropoffLocation = action.payload;
    },
    setBookingDetails: (
      state,
      action: PayloadAction<Partial<BookingState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setServiceType,
  setPickupLocation,
  setDropoffLocation,
  setBookingDetails,
} = bookingSlice.actions;
export default bookingSlice.reducer;
