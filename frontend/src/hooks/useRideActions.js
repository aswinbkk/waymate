import { useState } from "react";
import { toast } from "react-toastify";
import { userJoinRide, userLeaveRide, updateUserRide, deleteUserRide, addPassenger, removePassenger} from "../api/apiUserRide";
import {updateAgencyRide,deleteAgencyRide} from "../api/apiAgencyRide";

const useRideActions = ({fetchRides}) => {
  const [showRidePopup, setShowRidePopup] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [rideType, setRideType] = useState("");

  // Open Popup
  const openRidePopup = ( ride, type = "available" ) => {
    setSelectedRide(ride);
    setRideType(type);
    setShowRidePopup(true);
  };

  // Close Popup
  const closeRidePopup = () => {
    setShowRidePopup(false);
    setSelectedRide(null);
  };

  // Join Ride
  const handleJoinRide = async () => {

    try {
      const response = await userJoinRide(selectedRide.id);

      if (response.success) {
        toast.success("Ride joined");
        await fetchRides?.();
        closeRidePopup();

      } else {
        toast.error(response.msg);
      }

    } catch (error) {
      console.error(error);
      toast.error("Join failed");
    }
  };

  // Leave Ride
  const handleLeaveRide = async () => {

    try {
      const response = await userLeaveRide(selectedRide.id);

      if (response.success) {
        toast.success("Ride left");
        await fetchRides?.();
        fetchRides?.();
        closeRidePopup();

      } else {
        toast.error(response.msg);
      }

    } catch (error) {
      console.error(error);
      toast.error("Leave failed");
    }
  };

  // Update User Ride
  const handleUpdateRide = async (
    updatedData
  ) => {

    try {
      const response =
        await updateUserRide(
          selectedRide.id,
          updatedData
        );

      if (response.success) {
        toast.success("Ride updated");
        fetchRides?.();
        closeRidePopup();

      } else {
        toast.error(response.msg);
      }

    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  // Delete User Ride
  const handleDeleteRide = async () => {

    try {
      const response =
        await deleteUserRide(
          selectedRide.id
        );

      if (response.success) {
        toast.success("Ride deleted");
        fetchRides?.();
        closeRidePopup();

      } else {
        toast.error(response.msg);
      }

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  // Agency Update
  const handleAgencyUpdateRide = async (
    updatedData
  ) => {

    try {
      const response =
        await updateAgencyRide(
          selectedRide.id,
          updatedData
        );

      if (response.success) {
        toast.success("Agency ride updated");
        fetchRides?.();
        closeRidePopup();

      }

    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  // Agency Delete
  const handleAgencyDeleteRide = async () => {

    try {
      const response =
        await deleteAgencyRide(
          selectedRide.id
        );

      if (response.success) {
        toast.success("Agency ride deleted");
        fetchRides?.();
        closeRidePopup();

      }

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  // Add Passenger
  const handleAddPassenger = async (
    passengerId
  ) => {

    try {

      const response =
        await addPassenger(
          selectedRide.id,
          passengerId
        );

      if (response.success) {
        toast.success("Passenger added");
        fetchRides?.();
      }

    } catch (error) {
      console.error(error);
      toast.error("Add passenger failed");
    }
  };

  // Remove Passenger
  const handleRemovePassenger = async (
    passengerId
  ) => {

    try {

      const response =
        await removePassenger(
          selectedRide.id,
          passengerId
        );

      if (response.success) {
        toast.success("Passenger removed");
        fetchRides?.();
      }

    } catch (error) {
      console.error(error);
      toast.error("Remove passenger failed");
    }
  };

  return {

    showRidePopup,
    selectedRide,
    rideType,

    openRidePopup,
    closeRidePopup,

    handleJoinRide,
    handleLeaveRide,

    handleUpdateRide,
    handleDeleteRide,

    handleAgencyUpdateRide,
    handleAgencyDeleteRide,

    handleAddPassenger,
    handleRemovePassenger
  };
};

export default useRideActions;