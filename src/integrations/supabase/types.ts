export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          parent_id: string | null
          type: Database["public"]["Enums"]["category_type"]
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          parent_id?: string | null
          type: Database["public"]["Enums"]["category_type"]
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          parent_id?: string | null
          type?: Database["public"]["Enums"]["category_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string
          id: string
          receipt_url: string | null
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          date?: string
          description: string
          id?: string
          receipt_url?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          receipt_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      platforms: {
        Row: {
          base_fee: number
          created_at: string
          id: string
          name: string
          notes: string | null
          percentage_fee: number
          status: Database["public"]["Enums"]["platform_status"]
          url: string
          user_id: string
        }
        Insert: {
          base_fee?: number
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          percentage_fee?: number
          status?: Database["public"]["Enums"]["platform_status"]
          url: string
          user_id: string
        }
        Update: {
          base_fee?: number
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          percentage_fee?: number
          status?: Database["public"]["Enums"]["platform_status"]
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          condition: string
          created_at: string
          id: string
          last_updated: string
          location: string | null
          name: string
          notes: string | null
          purchase_date: string | null
          purchase_price: number
          quantity: number
          sku: string
          status: Database["public"]["Enums"]["product_status"] | null
          store_id: string | null
          target_price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category_id?: string | null
          condition: string
          created_at?: string
          id?: string
          last_updated?: string
          location?: string | null
          name: string
          notes?: string | null
          purchase_date?: string | null
          purchase_price: number
          quantity?: number
          sku: string
          status?: Database["public"]["Enums"]["product_status"] | null
          store_id?: string | null
          target_price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category_id?: string | null
          condition?: string
          created_at?: string
          id?: string
          last_updated?: string
          location?: string | null
          name?: string
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number
          quantity?: number
          sku?: string
          status?: Database["public"]["Enums"]["product_status"] | null
          store_id?: string | null
          target_price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_product_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          business_name: string | null
          created_at: string
          display_name: string | null
          full_name: string | null
          id: string
          preferred_currency: string | null
          shipping_address: Json | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_plan: string | null
          subscription_status: string | null
          tax_id: string | null
          trial_end_date: string | null
        }
        Insert: {
          avatar_url?: string | null
          business_name?: string | null
          created_at?: string
          display_name?: string | null
          full_name?: string | null
          id: string
          preferred_currency?: string | null
          shipping_address?: Json | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          tax_id?: string | null
          trial_end_date?: string | null
        }
        Update: {
          avatar_url?: string | null
          business_name?: string | null
          created_at?: string
          display_name?: string | null
          full_name?: string | null
          id?: string
          preferred_currency?: string | null
          shipping_address?: Json | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          tax_id?: string | null
          trial_end_date?: string | null
        }
        Relationships: []
      }
      returns: {
        Row: {
          created_at: string
          id: string
          product_id: string
          reason: string
          refund_amount: number
          restocking_fee: number | null
          return_date: string
          sale_id: string
          shipping_fee: number | null
          status: Database["public"]["Enums"]["return_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          reason: string
          refund_amount: number
          restocking_fee?: number | null
          return_date?: string
          sale_id: string
          shipping_fee?: number | null
          status?: Database["public"]["Enums"]["return_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          reason?: string
          refund_amount?: number
          restocking_fee?: number | null
          return_date?: string
          sale_id?: string
          shipping_fee?: number | null
          status?: Database["public"]["Enums"]["return_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_product"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "returns_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "returns_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          created_at: string
          estimated_profit: number | null
          id: string
          platform_fees: number | null
          platform_id: string
          product_id: string
          quantity: number
          sale_date: string
          sale_price: number
          shipping_amount_collected: number | null
          shipping_cost: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          estimated_profit?: number | null
          id?: string
          platform_fees?: number | null
          platform_id: string
          product_id: string
          quantity?: number
          sale_date?: string
          sale_price: number
          shipping_amount_collected?: number | null
          shipping_cost?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          estimated_profit?: number | null
          id?: string
          platform_fees?: number | null
          platform_id?: string
          product_id?: string
          quantity?: number
          sale_date?: string
          sale_price?: number
          shipping_amount_collected?: number | null
          shipping_cost?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          created_at: string
          id: string
          location: string
          name: string
          notes: string | null
          status: Database["public"]["Enums"]["store_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          name: string
          notes?: string | null
          status?: Database["public"]["Enums"]["store_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          name?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["store_status"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_product_sale: {
        Args: {
          p_product_id: string
          p_sale_quantity: number
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      category_type: "category" | "subcategory"
      platform_status: "active" | "inactive"
      product_status: "in_stock" | "listed" | "pending_shipment" | "shipped"
      return_status: "pending" | "approved" | "rejected"
      sale_status: "pending" | "completed" | "cancelled"
      store_status: "active" | "inactive"
      supported_currency:
        | "USD"
        | "EUR"
        | "GBP"
        | "CAD"
        | "AUD"
        | "JPY"
        | "CNY"
        | "INR"
        | "NZD"
        | "CHF"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
