/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ReportStatus */
export enum ReportStatus {
  Created = "created",
  Running = "running",
  Completed = "completed",
  Cancelled = "cancelled",
}

/** AttackSuccessRate */
export interface AttackSuccessRate {
  /**
   * Weighted Asr
   * Weighted attack success rate
   */
  weighted_asr?: number | null;
  /**
   * Unweighted Asr
   * Unweighted attack success rate
   */
  unweighted_asr?: number | null;
  /**
   * Categories
   * List of attack categories
   */
  categories?: Record<string, Record<string, number | null> | null> | null;
}

/** Category */
export interface Category {
  /** Name */
  name?: string | null;
  /** Policy Id */
  policy_id?: string | null;
  /** Subcategories */
  subcategories?: Record<string, SubCategory> | null;
}

/**
 * ChatbotResponse
 * Model returned by API for chatbot resources.
 */
export interface ChatbotResponse {
  /**
   * Chatbot name
   * Human-readable name of the chatbot.
   * @maxLength 120
   */
  name: string;
  /**
   * Description
   * Short description of chatbot purpose, capabilities or domain.
   */
  description?: string | null;
  /**
   * Chatbot ID
   * Unique identifier for the chatbot (UUID4).
   * @format uuid
   */
  id: string;
  /**
   * Creation timestamp
   * ISO 8601 timestamp when the chatbot was created.
   * @format date-time
   */
  created_at: string;
}

/** ConversationStatistic */
export interface ConversationStatistic {
  /**
   * Avg No Of Turns
   * Average number of turns
   */
  avg_no_of_turns?: number | null;
  /**
   * Avg Len Of Each Turn
   * Average turn length
   */
  avg_len_of_each_turn?: number | null;
  /**
   * Chat Len Distribution
   * Chat length distribution
   */
  chat_len_distribution?: Record<string, number> | null;
  /**
   * Message Len Distribution
   * Message length distribution
   */
  message_len_distribution?: Record<string, number> | null;
}

/** CreatePolicy */
export interface CreatePolicy {
  /**
   * Name
   * The name of the policy.
   */
  name: string;
  /**
   * Policy Text Md
   * The policy text in markdown format.
   */
  policy_text_md: string;
  /**
   * Policy Categories
   * The categories of the policy.
   */
  policy_categories: Record<string, string | number>;
}

/**
 * HealthResponse
 * Schema for system health check response.
 * Indicates whether the FastAPI application and its database connection are operational.
 */
export interface HealthResponse {
  /**
   * Status
   * Status of the application
   * @default "ok"
   */
  status?: string;
  /**
   * Database
   * Status of the database
   * @default "available"
   */
  database?: string;
}

/** Metadata */
export interface Metadata {
  /** Version */
  version: string;
  /** Created Date */
  created_date: string;
  /** Description */
  description: string;
  /** Total Policies */
  total_policies: number;
  /** Highlighted Count */
  highlighted_count: number;
  /** Starred Count */
  starred_count: number;
}

/**
 * Notifications
 * Represents a user's notification-related preferences.
 * Controls which email notifications are received and how they are paused.
 */
export interface Notifications {
  /**
   * Receive Marketing Email
   * Indicates whether the user consents to receive marketing or promotional emails. Defaults to False to respect user privacy by default.
   * @default false
   */
  receive_marketing_email?: boolean;
  /**
   * Receive Email On Report Ready
   * Specifies whether the user should receive an email notification when a report is ready. Enabled by default to ensure the user is informed of report completions.
   * @default true
   */
  receive_email_on_report_ready?: boolean;
  /**
   * Notification Pause Hrs
   * Defines the number of hours notifications should be paused. Value 0 means no pause (notifications active). The upper limit of 168 (7 days) ensures temporary silence without permanent disablement.
   * @min 0
   * @max 168
   * @default 0
   */
  notification_pause_hrs?: number;
}

/** PillarOneScore */
export interface PillarOneScore {
  /**
   * P1 Score
   * Pillar one score
   */
  p1_score?: number | null;
  /**
   * Chatbot Stats
   * chatbot score
   */
  chatbot_stats?: Record<string, string | number | null> | null;
  /**
   * Someai Chatbot Stats
   * SomeAI chatbot score
   */
  someai_chatbot_stats?: Record<string, string | number | null> | null;
  /**
   * Other Chatbot Stats
   * Other chatbot score
   */
  other_chatbot_stats?: Record<string, string | number | null> | null;
}

/** PillarTwoScore */
export interface PillarTwoScore {
  /**
   * P2 Score
   * Pillar two score
   */
  p2_score?: number | null;
  /**
   * Chatbot Stats
   * chatbot score
   */
  chatbot_stats?: Record<string, string | number | null> | null;
  /**
   * Someai Chatbot Stats
   * SomeAI chatbot score
   */
  someai_chatbot_stats?: Record<string, string | number | null> | null;
  /**
   * Other Chatbot Stats
   * Other chatbot score
   */
  other_chatbot_stats?: Record<string, string | number | null> | null;
}

/** PolicyCreateResponse */
export interface PolicyCreateResponse {
  /** Success */
  success?: boolean | null;
  /** Message */
  message?: string | null;
  /** Policy Id */
  policy_id?: string | null;
}

/** PolicyItem */
export interface PolicyItem {
  /** Name */
  name?: string | null;
  /** Policy Id */
  policy_id?: string | null;
  /** Description */
  description?: string | null;
  /** Categories */
  categories?: Record<string, Category> | null;
}

/** PolicyResponse */
export interface PolicyResponse {
  /** Id */
  id?: string | null;
  /** Name */
  name?: string | null;
  /** Policy Text Md */
  policy_text_md?: string | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  policy_categories?: PolicyTree | null;
}

/** PolicyTree */
export interface PolicyTree {
  /** Policy Tree */
  policy_tree?: Record<string, PolicyItem> | null;
  metadata?: Metadata | null;
}

/**
 * Preferences
 * Encapsulates all user-configurable settings.
 * Each section corresponds to a logical group (notifications, preferences, etc.).
 */
export interface Preferences {
  /** The user's email and notification-related settings. Includes marketing consent, report alerts, and pause duration. */
  notifications?: Notifications;
  /** The user's display and UI preferences. Currently supports theme mode selection, may be extended in future. */
  user_preferences?: UserPreferences;
}

/** ReportData */
export interface ReportData {
  /**
   * Id
   * Unique report identifier
   * @format uuid
   */
  id: string;
  /**
   * Policy Version
   * Policy version
   */
  policy_version?: string | null;
  /**
   * Policy Name
   * Policy name
   */
  policy_name?: string | null;
  /**
   * Chatbot Version
   * Model version
   */
  chatbot_version?: string | null;
  /**
   * Chatbot Name
   * Model name
   */
  chatbot_name?: string | null;
  /**
   * Created At
   * Report creation timestamp
   */
  created_at?: string | null;
  /**
   * Readiness Score
   * Overall readiness score
   */
  readiness_score?: number | null;
  /**
   * Readiness Text
   * Readiness summary text
   */
  readiness_text?: string | null;
  /** Pillar one score */
  p1?: PillarOneScore | null;
  /** Pillar two score */
  p2?: PillarTwoScore | null;
  /** Attack success metrics */
  attack_success_rate?: AttackSuccessRate | null;
  /** total simulations */
  total_simulations?: TotalCases | null;
  /** Chat-based statistics */
  conversation_statistics?: ConversationStatistic | null;
  /**
   * Simulations
   * List of performed attacks
   */
  simulations?: Simulation[] | null;
  /**
   * Risk Areas
   * Identified risk categories
   */
  risk_areas?: RiskArea[] | null;
  /**
   * Top Insight
   * Top insights data
   */
  top_insight?: TopInsight[] | null;
}

/** RiskArea */
export interface RiskArea {
  /**
   * Category Id
   * Category unique ID
   */
  category_id?: number | null;
  /**
   * Category Name
   * Category display name
   */
  category_name?: string | null;
  /**
   * Priority
   * Priority level
   */
  priority?: number | null;
  /**
   * High Risk Cases
   * Count of high risk cases
   */
  high_risk_cases?: number | null;
  /**
   * Avg Turns
   * Average conversation turns
   */
  avg_turns?: number | null;
  /**
   * Avg Turn Length
   * Average length per turn
   */
  avg_turn_length?: number | null;
  /**
   * Key Insight
   * Main insights summary
   */
  key_insight?: string[] | null;
  /**
   * Cases
   * List of related risk cases
   */
  cases?: RiskCase[] | null;
}

/** RiskCase */
export interface RiskCase {
  /**
   * Case Id
   * Risk case identifier
   */
  case_id?: number | null;
  /**
   * Risk Factor
   * Numerical risk factor
   */
  risk_factor?: number | null;
  /**
   * Risk Description
   * Description of the risk
   */
  risk_description?: string | null;
  /**
   * Expected
   * Expected result type
   */
  expected?: string | null;
  /**
   * Content
   * Associated content text
   */
  content?: string | null;
  /**
   * No Of Chats
   * Total chats in case
   */
  no_of_chats?: number | null;
  /**
   * Turn Length
   * Number of turns per chat
   */
  turn_length?: number | null;
}

/** Simulation */
export interface Simulation {
  /**
   * Id
   * Unique simulation ID
   */
  id?: string | null;
  /**
   * Category
   * Simulation category name
   */
  category?: string | null;
  /**
   * Model Reasoning
   * Model reasoning
   */
  model_reasoning?: string | null;
  /**
   * Content
   * Content of the simulation
   */
  content?: string | null;
  /**
   * Chat Length
   * Chat length
   */
  chat_length?: number | null;
  /**
   * Turn Length
   * Turn length
   */
  turn_length?: number | null;
  /**
   * Likelihood
   * Simulation likelihood level
   */
  likelihood?: string | null;
}

/** SubCategory */
export interface SubCategory {
  /** Name */
  name?: string | null;
  /** Policy Id */
  policy_id?: string | null;
  /**
   * Highlighted
   * @default false
   */
  highlighted?: boolean | null;
  /**
   * Starred
   * @default false
   */
  starred?: boolean | null;
}

/** TopInsight */
export interface TopInsight {
  /**
   * Title
   * Title of the insight
   */
  title?: string | null;
  /**
   * Focus
   * Focus of the insight
   */
  focus?: string | null;
  /**
   * Vulnerabilities
   * Vulnerabilities of the insight
   */
  vulnerabilities?: string[] | null;
}

/** TotalCases */
export interface TotalCases {
  /**
   * Total Simulation Count
   * Total simulations executed
   */
  total_simulation_count?: number | null;
  /**
   * Risk Categories
   * Risk category summary
   */
  risk_categories?: Record<string, number> | null;
}

/**
 * UpdateNotifications
 * Partial update model for Notifications.
 * All fields are optional, allowing selective updates.
 */
export interface UpdateNotifications {
  /**
   * Receive Marketing Email
   * Update marketing email subscription preference. True to enable, False to disable.
   */
  receive_marketing_email?: boolean | null;
  /**
   * Receive Email On Report Ready
   * Update whether the user should receive an email when a report is generated.
   */
  receive_email_on_report_ready?: boolean | null;
  /**
   * Notification Pause Hrs
   * Update notification pause duration in hours. Set 0 to resume notifications immediately.
   */
  notification_pause_hrs?: number | null;
}

/** UpdatePolicy */
export interface UpdatePolicy {
  /**
   * Name
   * The name of the policy.
   */
  name?: string | null;
  /**
   * Policy Text Md
   * The policy text in markdown format.
   */
  policy_text_md?: string | null;
  /**
   * Policy Categories
   * The ID of the category to create the policy in.
   */
  policy_categories?: Record<string, string | number> | null;
}

/**
 * UpdatePreferences
 * Partial update model for Preferences.
 * Allows changing theme or other user-experience options.
 */
export interface UpdatePreferences {
  /**
   * Theme Mode
   * Update the UI theme mode. Accepted values: 'light' or 'dark'.
   */
  theme_mode?: "light" | "dark" | null;
}

/**
 * UpdateSettings
 * Aggregated model for updating user settings.
 * Supports nested updates for notifications and preferences.
 * Only provided fields will be updated.
 */
export interface UpdateSettings {
  /** Partial update payload for notification-related settings. */
  notifications?: UpdateNotifications | null;
  /** Partial update payload for user preference settings. */
  user_preferences?: UpdatePreferences | null;
}

/**
 * UserPreferences
 * Represents the user's personal UI and experience preferences.
 * Stores display mode and potential future preference settings.
 */
export interface UserPreferences {
  /**
   * Theme Mode
   * Specifies the preferred application theme mode. Possible values are 'light' and 'dark'. Defaults to 'light'.
   * @default "light"
   */
  theme_mode?: "light" | "dark";
}

/**
 * UserProfileCreate
 * Request schema for creating a new user profile.
 */
export interface UserProfileCreate {
  /**
   * Organization Name
   * Name of the organization the user belongs to.
   */
  organization_name?: string | null;
  /**
   * First Name
   * User's first name.
   */
  first_name: string;
  /**
   * Last Name
   * User's last name.
   */
  last_name: string;
}

/**
 * UserProfileResponse
 * Response schema for retrieving the currently authenticated user's profile.
 */
export interface UserProfileResponse {
  /**
   * Id
   * User's Profile ID.
   * @format uuid
   */
  id: string;
  /**
   * Email
   * Email address of the user.
   * @format email
   */
  email: string;
  /**
   * Organization Name
   * Organization name.
   */
  organization_name: string;
  /**
   * Organization Id
   * Organization ID.
   * @format uuid
   */
  organization_id: string;
  /**
   * First Name
   * User's first name.
   */
  first_name: string;
  /**
   * Last Name
   * User's last name.
   */
  last_name: string;
  /** Users's settings */
  preferences?: Preferences | null;
}

/**
 * UserProfileUpdate
 * Request schema for updating specific fields in an existing user profile.
 */
export interface UserProfileUpdate {
  /**
   * Organization Name
   * Name of the organization the user belongs to.
   */
  organization_name?: string | null;
  /**
   * First Name
   * User's first name.
   */
  first_name?: string | null;
  /**
   * Last Name
   * User's last name.
   */
  last_name?: string | null;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8000",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Reinforce Labs API Gateway - BFF API
 * @version 1.0.0
 * @baseUrl http://localhost:8000
 *
 * Backend-for-Frontend API
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Returns the details of the currently authenticated user.
     *
     * @tags Users
     * @name GetCurrentUserApiV1UsersMeGet
     * @summary Retrieve details of the logged-in user
     * @request GET:/api/v1/users/me
     * @secure
     */
    getCurrentUserApiV1UsersMeGet: (params: RequestParams = {}) =>
      this.request<UserProfileResponse, void>({
        path: `/api/v1/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new user profile for the authenticated Supabase user. - Uses the email derived from Supabase token for identity.
     *
     * @tags Users
     * @name CreateUserProfileApiV1UsersPost
     * @summary Register a user profile
     * @request POST:/api/v1/users
     * @secure
     */
    createUserProfileApiV1UsersPost: (
      data: UserProfileCreate,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Update specific fields of the currently authenticated user's profile. - Accepts partial data (only fields to be updated need to be included). - Returns the fully updated profile record.
     *
     * @tags Users
     * @name UpdateUserProfileApiV1UsersPatch
     * @summary Update current user's profile
     * @request PATCH:/api/v1/users
     * @secure
     */
    updateUserProfileApiV1UsersPatch: (
      data: UserProfileUpdate,
      params: RequestParams = {},
    ) =>
      this.request<UserProfileResponse, void>({
        path: `/api/v1/users`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the settings of the currently authenticated user.
     *
     * @tags Users
     * @name UpdateUserSettingsApiV1UsersSettingsPatch
     * @summary Update user settings
     * @request PATCH:/api/v1/users/settings
     * @secure
     */
    updateUserSettingsApiV1UsersSettingsPatch: (
      data: UpdateSettings,
      params: RequestParams = {},
    ) =>
      this.request<Preferences, void>({
        path: `/api/v1/users/settings`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve all policies.
     *
     * @tags Policies
     * @name GetPoliciesApiV1PoliciesGet
     * @summary Retrieve a list of all available policies with metadata
     * @request GET:/api/v1/policies
     * @secure
     */
    getPoliciesApiV1PoliciesGet: (params: RequestParams = {}) =>
      this.request<PolicyResponse[], void>({
        path: `/api/v1/policies`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a policy.
     *
     * @tags Policies
     * @name CreatePolicyApiV1PoliciesPost
     * @summary Create policy
     * @request POST:/api/v1/policies
     * @secure
     */
    createPolicyApiV1PoliciesPost: (
      data: CreatePolicy,
      params: RequestParams = {},
    ) =>
      this.request<PolicyCreateResponse, void>({
        path: `/api/v1/policies`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the default policy.
     *
     * @tags Policies
     * @name GetDefaultPolicyApiV1PoliciesDefaultGet
     * @summary Get default policy
     * @request GET:/api/v1/policies/default
     */
    getDefaultPolicyApiV1PoliciesDefaultGet: (params: RequestParams = {}) =>
      this.request<PolicyTree, void>({
        path: `/api/v1/policies/default`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a policy by its ID.
     *
     * @tags Policies
     * @name GetPolicyByIdApiV1PoliciesPolicyIdGet
     * @summary Get policy by ID
     * @request GET:/api/v1/policies/{policy_id}
     * @secure
     */
    getPolicyByIdApiV1PoliciesPolicyIdGet: (
      policyId: string,
      params: RequestParams = {},
    ) =>
      this.request<PolicyResponse, void>({
        path: `/api/v1/policies/${policyId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a policy.
     *
     * @tags Policies
     * @name UpdatePolicyApiV1PoliciesPolicyIdPut
     * @summary Update policy
     * @request PUT:/api/v1/policies/{policy_id}
     * @secure
     */
    updatePolicyApiV1PoliciesPolicyIdPut: (
      policyId: string,
      data: UpdatePolicy,
      params: RequestParams = {},
    ) =>
      this.request<PolicyResponse, void>({
        path: `/api/v1/policies/${policyId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a policy.
     *
     * @tags Policies
     * @name DeletePolicyApiV1PoliciesPolicyIdDelete
     * @summary Delete policy
     * @request DELETE:/api/v1/policies/{policy_id}
     * @secure
     */
    deletePolicyApiV1PoliciesPolicyIdDelete: (
      policyId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/policies/${policyId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name GetAllReportsApiV1ReportsGet
     * @summary Get All Reports
     * @request GET:/api/v1/reports
     * @secure
     */
    getAllReportsApiV1ReportsGet: (
      query?: {
        /**
         * Chatbot Id
         * Unique chatbot identifier used to retrieve associated reports.
         */
        chatbot_id?: string | null;
        /**
         * Policy Id
         * Unique policy identifier used to retrieve associated reports.
         */
        policy_id?: string | null;
        /**
         * Status
         * Status of the reports to retrieve.
         */
        status?: ReportStatus | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReportData[], void>({
        path: `/api/v1/reports`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name GetReportByIdApiV1ReportsReportIdGet
     * @summary Get Report By Id
     * @request GET:/api/v1/reports/{report_id}
     * @secure
     */
    getReportByIdApiV1ReportsReportIdGet: (
      reportId: string,
      params: RequestParams = {},
    ) =>
      this.request<ReportData, void>({
        path: `/api/v1/reports/${reportId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve all chatbots.
     *
     * @tags chatbots
     * @name GetAllChatbotsApiV1ChatbotsGet
     * @summary List all chatbots
     * @request GET:/api/v1/chatbots
     * @secure
     */
    getAllChatbotsApiV1ChatbotsGet: (params: RequestParams = {}) =>
      this.request<ChatbotResponse[], void>({
        path: `/api/v1/chatbots`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches detailed information about a specific chatbot identified by its unique ID. Parameters: `chatbot_id` : The unique identifier of the chatbot to retrieve.
     *
     * @tags chatbots
     * @name GetChatbotByIdApiV1ChatbotsChatbotIdGet
     * @summary Get chatbot details by ID
     * @request GET:/api/v1/chatbots/{chatbot_id}
     * @secure
     */
    getChatbotByIdApiV1ChatbotsChatbotIdGet: (
      chatbotId: string,
      params: RequestParams = {},
    ) =>
      this.request<ChatbotResponse, void>({
        path: `/api/v1/chatbots/${chatbotId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  health = {
    /**
     * @description Simple health check. Runs `SELECT 1` to test database.
     *
     * @tags health
     * @name HealthHealthGet
     * @summary Check application and database health
     * @request GET:/health
     */
    healthHealthGet: (params: RequestParams = {}) =>
      this.request<HealthResponse, any>({
        path: `/health`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
