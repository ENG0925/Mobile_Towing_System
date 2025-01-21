"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
//import Profile from "@/image/icon/profile.png";
import Like from "@/image/icon/like.png";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import { FaHeart, FaStar } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Key } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
//import { addReview, getAllReview, likeReview } from "@/lib/api/user/review";
import { ReloadIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  comment: z
    .string()
    .min(10, {
      message: "Comment must be at least 10 characters.",
    })
    .max(160, {
      message: "Comment must not be longer than 30 characters.",
    }),
});

interface rating {
  comment: string;
  isLike: number;
  rating: number;
  reviewID: number;
  userName: string;
  numLike: number;
}

const Feedback = () => {
  const [ratingItem, setRatingItem] = useState<rating[]>([]);
  const rowsPerPage = 9;
  const countIndex = ratingItem.length;
  const countEndIndex = 9 - (countIndex % 9) + countIndex;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [ratingStar, setRatingStar] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoding] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    setLoding(true);
    const fetchData = async () => {
      try {
        if (localStorage.getItem("userID")) {
          // const response = await getAllReview(
          //   Number(localStorage.getItem("userID"))
          // );
          // console.log(response?.data.data);
          // setRatingItem(response?.data.data);
        } else {
          const sampleRatings: rating[] = Array.from(
            { length: 15 },
            (_, index) => ({
              comment: `This is comment number ${index + 1}`,
              isLike: Math.round(Math.random()), // Randomly 0 or 1
              rating: Math.floor(Math.random() * 5) + 1, // Random number between 1 and 5
              reviewID: index + 1,
              userName: `User${index + 1}`,
              numLike: Math.floor(Math.random() * 100), // Random number between 0 and 99
            })
          );

          setRatingItem(sampleRatings);
          // const response = await getAllReview(0);
          // setRatingItem(response?.data.data);
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoding(false);
      }
    };

    fetchData();
  }, []);

  const updateRatingItem = (id: number, isLike: boolean) => {
    setRatingItem((prevItems) =>
      prevItems.map((item) =>
        item.reviewID === id
          ? {
              ...item,
              isLike: isLike ? 1 : item.isLike,
              numLike: isLike ? item.numLike + 1 : item.numLike,
            }
          : item
      )
    );
  };

  const like = async (id: number, isLike: number) => {
    if (localStorage.getItem("userID")) {
      if (likedItems.has(id) || isLike === 1) {
        toast("You can only like this item once.", {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: "error",
        });
        return;
      }

      updateRatingItem(id, true);
      setLikedItems(new Set(likedItems).add(id));

      try {
        //await likeReview(Number(localStorage.getItem("userID")), id, true);
        toast("Like successful", {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: "success",
        });
      } catch (error) {
        console.error("Error: ", error);
        updateRatingItem(id, false);
        setLikedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    } else {
      toast("Please sign in first after can like the comment", {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: "error",
      });
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleDialog = () => {
    if (localStorage.getItem("userID")) {
      setDialogOpen(true);
    } else {
      toast("Please sign in first after leave comment", {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: "error",
      });
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (ratingStar < 1) {
      setError(true);
      return;
    }

    // await addReview(
    //   Number(localStorage.getItem("userID")),
    //   String(data.comment),
    //   ratingStar
    // );
    toast("Added comment to successfull", {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      type: "success",
    });

    setRatingStar(0);
    setError(false);
    window.location.reload();
  }

  return (
    <>
      {loading && (
        <div className="flex  items-center justify-center h-screen">
          <ReloadIcon className="animate-spin w-12 h-12 text-gray-500" />
          <span className="ml-2 text-gray-500">Loading...</span>
        </div>
      )}

      {!loading && (
        <>
          <div className="text-6xl text-center pt-8">
            <b>Our Best Service of rating and review</b>
          </div>
          <div className="flex flex-wrap mx-[50px] mt-12 place-content-center">
            {ratingItem.slice(startIndex, endIndex).map((item) => (
              <div
                key={item.reviewID}
                className="min-h-[200px] md:w-1/3 flex md:max-w-md pt-4 pr-4"
              >
                <div className="border-[1px] m-[6px] drop-shadow flex w-full">
                  <div className="md:w-1/3 md:max-w-md content-center web-center">
                    {/* <Image
                      src={Profile}
                      alt="profile"
                      width={130}
                      height={130}
                    /> */}
                  </div>
                  <div className="md:w-2/3 content-center my-[15px]">
                    <div>
                      <b>{item.userName}</b>
                    </div>
                    <div className="flex mt-2">
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <div key={index}>
                          <FaStar size={30} color="#ffc107" />
                        </div>
                      ))}

                      {Array.from({ length: 5 - item.rating }).map(
                        (_, index) => (
                          <div key={index}>
                            <FaStar size={30} color="#e4e5e9" />
                          </div>
                        )
                      )}
                    </div>
                    <div className="mt-2 md:max-w-md mr-[20px] ">
                      {item.comment}
                    </div>

                    <div className="flex float-end">
                      <div className="px-[10px] ">
                        <FaHeart
                          color={
                            item.isLike || likedItems.has(item.reviewID)
                              ? "red"
                              : "white"
                          }
                          className="cursor-pointer w-[25px] h-[25px]"
                          onClick={() => like(item.reviewID, item.isLike)}
                        />
                      </div>
                      <div className="mr-2">{item.numLike}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    startIndex === 0
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                  onClick={() => {
                    setStartIndex(startIndex - rowsPerPage);
                    setEndIndex(endIndex - rowsPerPage);
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  className={
                    endIndex ===
                    (countIndex % 9 == 0 ? countIndex : countEndIndex)
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                  onClick={() => {
                    setStartIndex(startIndex + rowsPerPage);
                    setEndIndex(endIndex + rowsPerPage);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="web-center">
            <Dialog>
              <DialogTrigger
                className="m-8 main-bg-color text-white p-2 rounded-xl"
                onClick={handleDialog}
              >
                Leave Your Comment
              </DialogTrigger>
              {dialogOpen && (
                <DialogContent className="max-w-fit  min-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Leave Your Comment</DialogTitle>
                  </DialogHeader>
                  <div className="pt-4">
                    <div className="flex justify-center pb-4">
                      {[...Array(5)].map((star, index) => {
                        const currentIndex = index + 1;
                        return (
                          <span key={index}>
                            <FaStar
                              size={50}
                              color={
                                currentIndex <= (hover || ratingStar)
                                  ? "#ffc107"
                                  : "#e4e5e9"
                              }
                              onClick={() => setRatingStar(currentIndex)}
                              onMouseEnter={() => setHover(currentIndex)}
                              onMouseLeave={() => setHover(0)}
                            />
                          </span>
                        );
                      })}
                    </div>
                    {error && (
                      <div className="text-red-500 text-center">
                        Please select at least one star
                      </div>
                    )}
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="comment"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Please leave your comment"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          className="w-full mt-2 main-bg-color"
                          type="submit"
                        >
                          Send message
                        </Button>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>

          <div className="mt-12 about-next text-center">
            <div className="min-h-[400px] absolute content-center">
              <h2 className="text-white text-6xl px-40">
                <b>
                  Have any problem of question. Here will solve your problem
                </b>
              </h2>
              <div className="mt-10 ">
                <Button className="main-bg-color mr-10 w-[300px] rounded-lg h-[60px]">
                  <NextLink href={"/faq"}>Explore More</NextLink>
                </Button>
                <Button className="main-bg-green mr-10 w-[300px] rounded-lg h-[60px]">
                  <NextLink href={"/tour"}>Book Now</NextLink>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Feedback;
