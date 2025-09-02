"use client";

import { useSession } from "next-auth/react";
import { ExternalLink, BarChart3, Eye, Lock } from "lucide-react";
import { Button } from "@/components";
import { AdminHeader } from "../_components/admin-header";

export default function AdminAnalyticsPage() {
  const { data: session } = useSession();

  return (
    <>
      <AdminHeader
        title="Analytics Dashboard"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="flex-1 p-8">
        <div>
          <div className="mb-8">
            <h1 className="text-lg font-medium text-gray-900">
              Website Analytics
            </h1>
            <p className="text-sm text-gray-500">
              Monitor your website performance, track user behavior, and analyze
              key metrics
            </p>
          </div>

          <div className="bg-white shadow-sm border border-primary-500/10 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-primary-500">
                    Umami Analytics
                  </h2>
                  <p className="text-primary-300 text-sm">
                    Privacy-focused website analytics platform
                  </p>
                </div>
              </div>
              <Button
                href="https://cloud.umami.is/login"
                target="_blank"
                leadingIcon={<ExternalLink />}
              >
                Open Analytics Dashboard
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Lock className="w-5 h-5 text-primary-500" />
                  <h3 className="font-semibold text-primary-500">
                    Login Credentials
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-primary-400 mb-1">
                      Email
                    </label>
                    <div className="bg-white border border-gray-200 rounded px-3 py-2 text-sm font-mono">
                      enobasse01@gmail.com
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-400 mb-1">
                      Password
                    </label>
                    <div className="bg-white border border-gray-200 rounded px-3 py-2 text-sm font-mono">
                      qC7!HLUEGDVJtt
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Eye className="w-5 h-5 text-primary-500" />
                  <h3 className="font-semibold text-primary-500">
                    Quick Access
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-400">Website</span>
                    <span className="text-sm font-medium text-primary-500">
                      enobasse.com
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-400">
                      Dashboard URL
                    </span>
                    <span className="text-sm font-medium text-primary-500">
                      umami.is
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary-500/10 border border-secondary-200 p-6">
            <h3 className="font-semibold text-secondary-500 mb-3 text-lg">
              Accessing the Dashboard
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-secondary-500">
              <li>Click the "Open Analytics Dashboard" button above</li>
              <li>Sign in using the provided credentials</li>
              <li>Navigate to your website's analytics dashboard</li>
              <li>
                Explore metrics like page views, visitors, and referral sources
              </li>
              <li>Set up custom events and goals for better tracking</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
