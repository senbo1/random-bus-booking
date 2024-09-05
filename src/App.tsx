import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const BusSeatBooking = () => {
  const [seats, setSeats] = useState(Array(50).fill(false));

  const bookRandomSeat = () => {
    const availableSeats = seats
      .map((isBooked, index) => (isBooked ? -1 : index))
      .filter((index) => index !== -1);
    if (availableSeats.length === 0) {
      alert('All seats are booked!');
      return;
    }
    const randomSeat =
      availableSeats[Math.floor(Math.random() * availableSeats.length)];
    const newSeats = [...seats];
    newSeats[randomSeat] = true;
    setSeats(newSeats);
  };

  const cancelRandomBooking = () => {
    const bookedSeats = seats
      .map((isBooked, index) => (isBooked ? index : -1))
      .filter((index) => index !== -1);
    if (bookedSeats.length === 0) {
      alert('No bookings to cancel!');
      return;
    }
    const randomBookedSeatIndex =
      bookedSeats[Math.floor(Math.random() * bookedSeats.length)];
    const newSeats = [...seats];
    newSeats[randomBookedSeatIndex] = false;
    setSeats(newSeats);
  };

  const toggleSeatBooking = (seatIndex: number) => {
    const newSeats = [...seats];
    newSeats[seatIndex] = !newSeats[seatIndex];
    setSeats(newSeats);
  };

  return (
    <div className="p-4 container mx-auto max-w-6xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-blue-600">
        Bus Seat Booking App
      </h1>
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-600">
        Made by Harsh and Aaditya
      </h2>

      <div className="flex space-x-4 mb-4 justify-center">
        <Button onClick={bookRandomSeat}>Book Random Seat</Button>
        <Button onClick={cancelRandomBooking} variant="destructive">
          Cancel Random Booking
        </Button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {seats.map((isBooked, index) => (
          <AlertDialog key={index}>
            <AlertDialogTrigger asChild>
              <Button
                variant={isBooked ? 'default' : 'outline'}
                onClick={() => toggleSeatBooking(index)}
              >
                {isBooked ? 'Booked' : `Seat ${index + 1}`}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Seat {index + 1}</AlertDialogTitle>
                <AlertDialogDescription>
                  {isBooked
                    ? 'Booked your seat. Click to cancel the booking.'
                    : 'This seat is available. Click to book.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>
    </div>
  );
};

export default BusSeatBooking;
