export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          language: string
          title: string
          slug: string
          description: string
          featured_image_url: string | null
          is_pinned: boolean
          status: string
          visibility: string
          published_at: string | null
          created_at: string
          updated_at: string
          content?: string
          author_id?: string
        }
        Insert: {
          id?: string
          language: string
          title: string
          slug: string
          description: string
          featured_image_url?: string | null
          is_pinned?: boolean
          status?: string
          visibility?: string
          published_at?: string | null
          created_at?: string
          updated_at?: string
          content?: string
          author_id?: string
        }
        Update: {
          id?: string
          language?: string
          title?: string
          slug?: string
          description?: string
          featured_image_url?: string | null
          is_pinned?: boolean
          status?: string
          visibility?: string
          published_at?: string | null
          created_at?: string
          updated_at?: string
          content?: string
          author_id?: string
        }
      }
      credit_logs: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: string
          description?: string
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          stripe_subscription_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          stripe_subscription_id: string
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          stripe_subscription_id?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      post_status: "draft" | "published" | "archived"
      post_visibility: "public" | "logged_in" | "subscribers"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];