import { MakeGenerics, Navigate, Route } from "@tanstack/react-location";
import { getAllCourses } from "./hooks/useGetAllCourses";
import { getCourse } from "./hooks/useGetCourse";
import { getCourses } from "./hooks/useGetCourses";
import { queryClient } from "./lib/react-query";
import Admin from "./pages/admin";
import CreateCourse from "./pages/create-course";
import Dashboard from "./pages/dashboard";
import ManageCourse from "./pages/ManageCourse";
import ManageCourses from "./pages/ManageCourses";

// 1. Add this import
import AdminRoute from "./components/AdminRoute";

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    // ordersForStudent: ICourse[];
    // courseProgress: ICourseProgress;
  };
  Params: {
    courseId: string;
  };
}>;

export const routes: Route<LocationGenerics>[] = [
  {
    path: "/",
    element: <Dashboard />,
    loader: async () => {
      return (
        queryClient.getQueryData(["getCourses"]) ??
        (await queryClient.fetchQuery(["getCourses"], () => getCourses()))
      );
    },
  },
  {
    path: "admin",
    // 2. Wrap Admin in AdminRoute here!
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to={"courses"} />,
      },
      {
        path: "courses",
        element: <ManageCourses />,
        loader: async () => {
          return (
            queryClient.getQueryData(["getAllCourses"]) ??
            (await queryClient.fetchQuery(["getAllCourses"], () =>
              getAllCourses()
            ))
          );
        },
        children: [
          { path: "add", element: <CreateCourse /> },
          {
            path: ":courseId",
            element: <ManageCourse />,
            loader: async ({ params }) => {
              return (
                queryClient.getQueryData(["getCourse", params.courseId]) ??
                (await queryClient.fetchQuery(
                  ["getCourse", params.courseId],
                  () => getCourse(params.courseId)
                ))
              );
            },
          },
        ],
      },
    ],
  },
];