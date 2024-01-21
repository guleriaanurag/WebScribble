import { RouterProvider , createBrowserRouter } from 'react-router-dom';

import AuthenticationContextProvider from './store/AuthenticationContext';
import HomePage from './pages/Home';
import Introduction from './components/Introduction';
import BlogsLayout from './pages/BlogsLayout'
import CategoryBlogs, {loader as categoryBlogLoader} from './pages/CategoryBlogs';
import './App.css'
import Blogs,{loader as blogLoader} from './pages/Blogs';
import CreateBlog , {action as createBlogAction} from './components/CreateBlog';
import SignupForm , {action as signupAction} from './components/SignupForm'
import LoginForm,{action as loginAction} from './components/LoginForm';
import BlogLandingPage , {loader as blogLandingLoader} from './components/BlogLanding';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      children: [
        {
          index:true,
          element: <Introduction />
        },
        {
          path: 'blogs',
          element: <BlogsLayout />,
          children: [
            {
              index: true,
              loader: blogLoader,
              element: <Blogs />
            },
            {
              path: ':category',
              element: <CategoryBlogs />,
              loader: categoryBlogLoader
            },
            {
              path: 'post',
              element: <CreateBlog />,
              action: createBlogAction
            },
            {
              path: 'blog/:id',
              element: <BlogLandingPage />,
              loader: blogLandingLoader,
              id: 'landing-loader'
            }
          ]
        },
        {
          path: 'signup',
          element: <SignupForm />,
          action: signupAction
        },
        {
          path: 'login',
          element: <LoginForm />,
          action: loginAction
        }
      ]
    }
  ])

  return(
    <AuthenticationContextProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthenticationContextProvider>
  );
}

export default App
