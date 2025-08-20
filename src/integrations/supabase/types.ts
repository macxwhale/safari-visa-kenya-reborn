export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      eta_applications: {
        Row: {
          accommodation_address: string | null
          accommodation_check_in_date: string | null
          accommodation_check_out_date: string | null
          arrival_airline: string | null
          arrival_mode: string | null
          arrival_port: string | null
          bringing_currency_over_5000: boolean | null
          convicted_in_past_5_years: boolean | null
          country_of_birth: string | null
          customs_declaration: boolean | null
          date_of_birth: string | null
          denied_entry_to_kenya: boolean | null
          departure_airline: string | null
          departure_flight_number: string | null
          departure_mode: string | null
          departure_port: string | null
          doc_url: string | null
          email: string
          entry_date: string
          exit_date: string | null
          final_destination_country: string | null
          flight_number: string | null
          full_name: string
          home_address: string | null
          id: string
          marital_status: string | null
          nationality: string
          nationality_at_birth: string | null
          occupation: string | null
          ocr_date_of_birth: string | null
          ocr_document_number: string | null
          ocr_extracted_at: string | null
          ocr_full_name: string | null
          ocr_validity_date: string | null
          paid_at: string | null
          passport: string
          passport_expiry_date: string | null
          passport_issue_date: string | null
          payment_amount_kes: number | null
          payment_amount_usd: number | null
          payment_reference: string | null
          payment_status: string | null
          phone: string | null
          place_of_birth: string | null
          previously_travelled_to_kenya: boolean | null
          purpose_of_visit: string | null
          selfie_url: string | null
          status: string
          submitted_at: string | null
          travel_from: string
          trip_financed_by_third_party: boolean | null
          user_id: string | null
        }
        Insert: {
          accommodation_address?: string | null
          accommodation_check_in_date?: string | null
          accommodation_check_out_date?: string | null
          arrival_airline?: string | null
          arrival_mode?: string | null
          arrival_port?: string | null
          bringing_currency_over_5000?: boolean | null
          convicted_in_past_5_years?: boolean | null
          country_of_birth?: string | null
          customs_declaration?: boolean | null
          date_of_birth?: string | null
          denied_entry_to_kenya?: boolean | null
          departure_airline?: string | null
          departure_flight_number?: string | null
          departure_mode?: string | null
          departure_port?: string | null
          doc_url?: string | null
          email: string
          entry_date: string
          exit_date?: string | null
          final_destination_country?: string | null
          flight_number?: string | null
          full_name: string
          home_address?: string | null
          id?: string
          marital_status?: string | null
          nationality: string
          nationality_at_birth?: string | null
          occupation?: string | null
          ocr_date_of_birth?: string | null
          ocr_document_number?: string | null
          ocr_extracted_at?: string | null
          ocr_full_name?: string | null
          ocr_validity_date?: string | null
          paid_at?: string | null
          passport: string
          passport_expiry_date?: string | null
          passport_issue_date?: string | null
          payment_amount_kes?: number | null
          payment_amount_usd?: number | null
          payment_reference?: string | null
          payment_status?: string | null
          phone?: string | null
          place_of_birth?: string | null
          previously_travelled_to_kenya?: boolean | null
          purpose_of_visit?: string | null
          selfie_url?: string | null
          status?: string
          submitted_at?: string | null
          travel_from: string
          trip_financed_by_third_party?: boolean | null
          user_id?: string | null
        }
        Update: {
          accommodation_address?: string | null
          accommodation_check_in_date?: string | null
          accommodation_check_out_date?: string | null
          arrival_airline?: string | null
          arrival_mode?: string | null
          arrival_port?: string | null
          bringing_currency_over_5000?: boolean | null
          convicted_in_past_5_years?: boolean | null
          country_of_birth?: string | null
          customs_declaration?: boolean | null
          date_of_birth?: string | null
          denied_entry_to_kenya?: boolean | null
          departure_airline?: string | null
          departure_flight_number?: string | null
          departure_mode?: string | null
          departure_port?: string | null
          doc_url?: string | null
          email?: string
          entry_date?: string
          exit_date?: string | null
          final_destination_country?: string | null
          flight_number?: string | null
          full_name?: string
          home_address?: string | null
          id?: string
          marital_status?: string | null
          nationality?: string
          nationality_at_birth?: string | null
          occupation?: string | null
          ocr_date_of_birth?: string | null
          ocr_document_number?: string | null
          ocr_extracted_at?: string | null
          ocr_full_name?: string | null
          ocr_validity_date?: string | null
          paid_at?: string | null
          passport?: string
          passport_expiry_date?: string | null
          passport_issue_date?: string | null
          payment_amount_kes?: number | null
          payment_amount_usd?: number | null
          payment_reference?: string | null
          payment_status?: string | null
          phone?: string | null
          place_of_birth?: string | null
          previously_travelled_to_kenya?: boolean | null
          purpose_of_visit?: string | null
          selfie_url?: string | null
          status?: string
          submitted_at?: string | null
          travel_from?: string
          trip_financed_by_third_party?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_kes: number
          amount_usd: number
          application_id: string
          created_at: string
          currency: string
          id: string
          paid_at: string | null
          payment_method: string | null
          paystack_access_code: string | null
          paystack_reference: string
          paystack_response: Json | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount_kes: number
          amount_usd: number
          application_id: string
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          paystack_access_code?: string | null
          paystack_reference: string
          paystack_response?: Json | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount_kes?: number
          amount_usd?: number
          application_id?: string
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          paystack_access_code?: string | null
          paystack_reference?: string
          paystack_response?: Json | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "eta_applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
