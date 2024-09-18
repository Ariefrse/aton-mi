import { Link } from "lucide-react";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between">
        <div className="text-white mb-8 md:mb-0 md:mr-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to</h1>
          <h2 className="text-5xl md:text-7xl font-bold">AtoN Dashboard</h2>
        </div>
        <div className="w-full max-w-md">
          <form className="bg-gray-800 bg-opacity-50 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl text-white font-semibold mb-6">Sign in to your account</h3>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot your password?
              </a> </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Sign In
            </button>
            <p className="mt-4 text-sm text-gray-400 text-center">
              By signing in, I accept the{" "}
              <Link href="/terms" className="text-blue-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and acknowledge the{" "}
              <Link href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-around">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-4 bg-gray-600 rounded-t-md"
            style={{ height: `${Math.random() * 100}%` }}
          ></div>
        ))}
      </div>
    </div>
  )
}