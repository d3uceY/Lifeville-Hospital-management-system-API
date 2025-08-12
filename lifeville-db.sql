--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-08-12 19:02:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5162 (class 1262 OID 24576)
-- Name: LIFEVILLE_HMS_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "LIFEVILLE_HMS_db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "LIFEVILLE_HMS_db" OWNER TO postgres;

\connect "LIFEVILLE_HMS_db"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5163 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 902 (class 1247 OID 49251)
-- Name: gender_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender_enum AS ENUM (
    'Male',
    'Female',
    'Other'
);


ALTER TYPE public.gender_enum OWNER TO postgres;

--
-- TOC entry 908 (class 1247 OID 49328)
-- Name: patient_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.patient_type_enum AS ENUM (
    'INPATIENT',
    'OUTPATIENT',
    'NULL'
);


ALTER TYPE public.patient_type_enum OWNER TO postgres;

--
-- TOC entry 5164 (class 0 OID 0)
-- Dependencies: 908
-- Name: TYPE patient_type_enum; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TYPE public.patient_type_enum IS 'has types of INPATIENT and OUTPATIENT';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 32844)
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    appointment_id integer NOT NULL,
    patient_id integer NOT NULL,
    doctor_id integer,
    appointment_date timestamp without time zone NOT NULL,
    notes text,
    status character varying(20) DEFAULT 'scheduled'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT appointments_status_check CHECK (((status)::text = ANY ((ARRAY['scheduled'::character varying, 'confirmed'::character varying, 'pending'::character varying, 'canceled'::character varying, 'completed'::character varying])::text[])))
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 32843)
-- Name: appointments_appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointments_appointment_id_seq OWNER TO postgres;

--
-- TOC entry 5165 (class 0 OID 0)
-- Dependencies: 223
-- Name: appointments_appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointments_appointment_id_seq OWNED BY public.appointments.appointment_id;


--
-- TOC entry 238 (class 1259 OID 57554)
-- Name: bed_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bed_groups (
    id integer NOT NULL,
    group_name text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.bed_groups OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 57553)
-- Name: bed_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bed_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bed_groups_id_seq OWNER TO postgres;

--
-- TOC entry 5166 (class 0 OID 0)
-- Dependencies: 237
-- Name: bed_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bed_groups_id_seq OWNED BY public.bed_groups.id;


--
-- TOC entry 236 (class 1259 OID 57543)
-- Name: bed_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bed_types (
    id integer NOT NULL,
    type_name text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.bed_types OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 57542)
-- Name: bed_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bed_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bed_types_id_seq OWNER TO postgres;

--
-- TOC entry 5167 (class 0 OID 0)
-- Dependencies: 235
-- Name: bed_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bed_types_id_seq OWNED BY public.bed_types.id;


--
-- TOC entry 240 (class 1259 OID 57565)
-- Name: beds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.beds (
    id integer NOT NULL,
    bed_type_id integer NOT NULL,
    bed_group_id integer NOT NULL,
    bed_name text NOT NULL,
    used boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.beds OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 57564)
-- Name: beds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.beds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beds_id_seq OWNER TO postgres;

--
-- TOC entry 5168 (class 0 OID 0)
-- Dependencies: 239
-- Name: beds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.beds_id_seq OWNED BY public.beds.id;


--
-- TOC entry 246 (class 1259 OID 82112)
-- Name: bill_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bill_items (
    id integer NOT NULL,
    bill_id integer NOT NULL,
    description text NOT NULL,
    unit_price numeric(12,2) NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    line_total numeric(12,2) GENERATED ALWAYS AS ((unit_price * (quantity)::numeric)) STORED
);


ALTER TABLE public.bill_items OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 82111)
-- Name: bill_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bill_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bill_items_id_seq OWNER TO postgres;

--
-- TOC entry 5169 (class 0 OID 0)
-- Dependencies: 245
-- Name: bill_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bill_items_id_seq OWNED BY public.bill_items.id;


--
-- TOC entry 244 (class 1259 OID 82096)
-- Name: bills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bills (
    id integer NOT NULL,
    bill_number text NOT NULL,
    patient_id integer NOT NULL,
    issued_by character varying(100) NOT NULL,
    bill_date timestamp without time zone DEFAULT now() NOT NULL,
    subtotal numeric(12,2) NOT NULL,
    discount numeric(12,2) DEFAULT 0 NOT NULL,
    tax numeric(12,2) DEFAULT 0 NOT NULL,
    total_amount numeric(12,2) NOT NULL,
    status character varying(20) DEFAULT 'unpaid'::character varying NOT NULL,
    payment_method character varying(20),
    amount_paid numeric(12,2) DEFAULT 0 NOT NULL,
    payment_date timestamp without time zone,
    notes text,
    updated_by text,
    updated_at timestamp without time zone
);


ALTER TABLE public.bills OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 82095)
-- Name: bills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bills_id_seq OWNER TO postgres;

--
-- TOC entry 5170 (class 0 OID 0)
-- Dependencies: 243
-- Name: bills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bills_id_seq OWNED BY public.bills.id;


--
-- TOC entry 228 (class 1259 OID 49258)
-- Name: birth_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.birth_records (
    birth_id integer NOT NULL,
    child_name character varying(150) NOT NULL,
    gender public.gender_enum NOT NULL,
    birth_date date NOT NULL,
    mother_name character varying(150) NOT NULL,
    father_name character varying(150),
    weight numeric(5,2),
    phone_number character varying(20),
    address text,
    report text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.birth_records OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 49257)
-- Name: birth_records_reference_number_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.birth_records_reference_number_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.birth_records_reference_number_seq OWNER TO postgres;

--
-- TOC entry 5171 (class 0 OID 0)
-- Dependencies: 227
-- Name: birth_records_reference_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.birth_records_reference_number_seq OWNED BY public.birth_records.birth_id;


--
-- TOC entry 252 (class 1259 OID 98480)
-- Name: complaints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complaints (
    id integer NOT NULL,
    recorded_by text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    patient_id integer NOT NULL,
    complaint text
);


ALTER TABLE public.complaints OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 98479)
-- Name: complaints_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.complaints_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.complaints_id_seq OWNER TO postgres;

--
-- TOC entry 5172 (class 0 OID 0)
-- Dependencies: 251
-- Name: complaints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.complaints_id_seq OWNED BY public.complaints.id;


--
-- TOC entry 258 (class 1259 OID 106687)
-- Name: conditions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conditions (
    condition_id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.conditions OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 106686)
-- Name: conditions_condition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conditions_condition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.conditions_condition_id_seq OWNER TO postgres;

--
-- TOC entry 5173 (class 0 OID 0)
-- Dependencies: 257
-- Name: conditions_condition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conditions_condition_id_seq OWNED BY public.conditions.condition_id;


--
-- TOC entry 226 (class 1259 OID 41113)
-- Name: death_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.death_records (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    death_date timestamp without time zone NOT NULL,
    guardian character varying(100),
    attachment text,
    report text
);


ALTER TABLE public.death_records OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 41112)
-- Name: death_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.death_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.death_records_id_seq OWNER TO postgres;

--
-- TOC entry 5174 (class 0 OID 0)
-- Dependencies: 225
-- Name: death_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.death_records_id_seq OWNED BY public.death_records.id;


--
-- TOC entry 256 (class 1259 OID 106672)
-- Name: diagnoses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diagnoses (
    diagnosis_id integer NOT NULL,
    patient_id integer NOT NULL,
    recorded_by text NOT NULL,
    diagnosis_date timestamp without time zone DEFAULT now(),
    condition text NOT NULL,
    notes text
);


ALTER TABLE public.diagnoses OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 106671)
-- Name: diagnoses_diagnosis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.diagnoses_diagnosis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.diagnoses_diagnosis_id_seq OWNER TO postgres;

--
-- TOC entry 5175 (class 0 OID 0)
-- Dependencies: 255
-- Name: diagnoses_diagnosis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.diagnoses_diagnosis_id_seq OWNED BY public.diagnoses.diagnosis_id;


--
-- TOC entry 222 (class 1259 OID 32833)
-- Name: doctors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctors (
    doctor_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    specialty character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.doctors OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 32832)
-- Name: doctors_doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctors_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctors_doctor_id_seq OWNER TO postgres;

--
-- TOC entry 5176 (class 0 OID 0)
-- Dependencies: 221
-- Name: doctors_doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctors_doctor_id_seq OWNED BY public.doctors.doctor_id;


--
-- TOC entry 234 (class 1259 OID 57522)
-- Name: inpatient_admissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inpatient_admissions (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    symptom_types text[] NOT NULL,
    symptom_description text,
    note text,
    previous_medical_issue text,
    admission_date timestamp without time zone NOT NULL,
    consultant_doctor_id integer NOT NULL,
    bed_group character varying(50),
    bed_number character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.inpatient_admissions OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 57521)
-- Name: inpatient_admissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inpatient_admissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inpatient_admissions_id_seq OWNER TO postgres;

--
-- TOC entry 5177 (class 0 OID 0)
-- Dependencies: 233
-- Name: inpatient_admissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inpatient_admissions_id_seq OWNED BY public.inpatient_admissions.id;


--
-- TOC entry 250 (class 1259 OID 90317)
-- Name: lab_test_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lab_test_types (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.lab_test_types OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 90316)
-- Name: lab_test_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lab_test_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lab_test_types_id_seq OWNER TO postgres;

--
-- TOC entry 5178 (class 0 OID 0)
-- Dependencies: 249
-- Name: lab_test_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lab_test_types_id_seq OWNED BY public.lab_test_types.id;


--
-- TOC entry 248 (class 1259 OID 90300)
-- Name: lab_tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lab_tests (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    prescribed_by text,
    test_type text NOT NULL,
    status text DEFAULT 'to_do'::text NOT NULL,
    comments text,
    results text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.lab_tests OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 90299)
-- Name: lab_tests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lab_tests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lab_tests_id_seq OWNER TO postgres;

--
-- TOC entry 5179 (class 0 OID 0)
-- Dependencies: 247
-- Name: lab_tests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lab_tests_id_seq OWNED BY public.lab_tests.id;


--
-- TOC entry 217 (class 1259 OID 24577)
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    patient_id integer NOT NULL,
    date date NOT NULL,
    hospital_number character varying(50) NOT NULL,
    first_name character varying(255) NOT NULL,
    other_names character varying(255),
    sex character varying(10) NOT NULL,
    marital_status character varying(50),
    date_of_birth date NOT NULL,
    phone_number character varying(20),
    address text,
    occupation character varying(255),
    place_of_work_address text,
    religion character varying(255),
    nationality character varying(255),
    next_of_kin character varying(255),
    relationship character varying(255),
    next_of_kin_phone character varying(20),
    next_of_kin_address text,
    past_surgical_history text,
    family_history text,
    social_history text,
    drug_history text,
    allergies text,
    dietary_restrictions text,
    diet_allergies_to_drugs text,
    past_medical_history text,
    surname character varying(255),
    patient_type public.patient_type_enum
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24580)
-- Name: patients_patient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.patients ALTER COLUMN patient_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.patients_patient_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 254 (class 1259 OID 98501)
-- Name: physical_examinations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.physical_examinations (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    recorded_by text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    general_appearance text,
    heent text,
    cardiovascular text,
    respiration text,
    gastrointestinal text,
    gynecology_obstetrics text,
    musculoskeletal text,
    neurological text,
    skin text,
    findings text
);


ALTER TABLE public.physical_examinations OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 98500)
-- Name: physical_examinations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.physical_examinations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.physical_examinations_id_seq OWNER TO postgres;

--
-- TOC entry 5180 (class 0 OID 0)
-- Dependencies: 253
-- Name: physical_examinations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.physical_examinations_id_seq OWNED BY public.physical_examinations.id;


--
-- TOC entry 232 (class 1259 OID 49354)
-- Name: symptom_heads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.symptom_heads (
    symptom_head_id integer NOT NULL,
    symptom_head text NOT NULL,
    symptom_type_id integer NOT NULL,
    symptom_description text
);


ALTER TABLE public.symptom_heads OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 49353)
-- Name: symptom_heads_symptom_head_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.symptom_heads_symptom_head_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.symptom_heads_symptom_head_id_seq OWNER TO postgres;

--
-- TOC entry 5181 (class 0 OID 0)
-- Dependencies: 231
-- Name: symptom_heads_symptom_head_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.symptom_heads_symptom_head_id_seq OWNED BY public.symptom_heads.symptom_head_id;


--
-- TOC entry 230 (class 1259 OID 49334)
-- Name: symptom_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.symptom_types (
    symptom_type_id integer NOT NULL,
    symptom_text text NOT NULL
);


ALTER TABLE public.symptom_types OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 49333)
-- Name: symptom_types_symptom_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.symptom_types_symptom_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.symptom_types_symptom_type_id_seq OWNER TO postgres;

--
-- TOC entry 5182 (class 0 OID 0)
-- Dependencies: 229
-- Name: symptom_types_symptom_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.symptom_types_symptom_type_id_seq OWNED BY public.symptom_types.symptom_type_id;


--
-- TOC entry 242 (class 1259 OID 65712)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) DEFAULT 'staff'::character varying NOT NULL,
    refresh_token text,
    created_by integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying(255) DEFAULT 'Super Admin'::character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 65711)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5183 (class 0 OID 0)
-- Dependencies: 241
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 220 (class 1259 OID 24614)
-- Name: vital_signs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vital_signs (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    recorded_at timestamp without time zone,
    temperature numeric,
    blood_pressure_systolic integer,
    blood_pressure_diastolic integer,
    weight numeric,
    pulse_rate integer,
    spo2 integer,
    recorded_by text,
    created_at timestamp without time zone
);


ALTER TABLE public.vital_signs OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24613)
-- Name: vital_signs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vital_signs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vital_signs_id_seq OWNER TO postgres;

--
-- TOC entry 5184 (class 0 OID 0)
-- Dependencies: 219
-- Name: vital_signs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vital_signs_id_seq OWNED BY public.vital_signs.id;


--
-- TOC entry 4851 (class 2604 OID 32847)
-- Name: appointments appointment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_id SET DEFAULT nextval('public.appointments_appointment_id_seq'::regclass);


--
-- TOC entry 4867 (class 2604 OID 57557)
-- Name: bed_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed_groups ALTER COLUMN id SET DEFAULT nextval('public.bed_groups_id_seq'::regclass);


--
-- TOC entry 4864 (class 2604 OID 57546)
-- Name: bed_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed_types ALTER COLUMN id SET DEFAULT nextval('public.bed_types_id_seq'::regclass);


--
-- TOC entry 4870 (class 2604 OID 57568)
-- Name: beds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beds ALTER COLUMN id SET DEFAULT nextval('public.beds_id_seq'::regclass);


--
-- TOC entry 4884 (class 2604 OID 82115)
-- Name: bill_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_items ALTER COLUMN id SET DEFAULT nextval('public.bill_items_id_seq'::regclass);


--
-- TOC entry 4878 (class 2604 OID 82099)
-- Name: bills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills ALTER COLUMN id SET DEFAULT nextval('public.bills_id_seq'::regclass);


--
-- TOC entry 4856 (class 2604 OID 49261)
-- Name: birth_records birth_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.birth_records ALTER COLUMN birth_id SET DEFAULT nextval('public.birth_records_reference_number_seq'::regclass);


--
-- TOC entry 4893 (class 2604 OID 98483)
-- Name: complaints id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints ALTER COLUMN id SET DEFAULT nextval('public.complaints_id_seq'::regclass);


--
-- TOC entry 4899 (class 2604 OID 106690)
-- Name: conditions condition_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conditions ALTER COLUMN condition_id SET DEFAULT nextval('public.conditions_condition_id_seq'::regclass);


--
-- TOC entry 4855 (class 2604 OID 41116)
-- Name: death_records id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.death_records ALTER COLUMN id SET DEFAULT nextval('public.death_records_id_seq'::regclass);


--
-- TOC entry 4897 (class 2604 OID 106675)
-- Name: diagnoses diagnosis_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diagnoses ALTER COLUMN diagnosis_id SET DEFAULT nextval('public.diagnoses_diagnosis_id_seq'::regclass);


--
-- TOC entry 4849 (class 2604 OID 32836)
-- Name: doctors doctor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors ALTER COLUMN doctor_id SET DEFAULT nextval('public.doctors_doctor_id_seq'::regclass);


--
-- TOC entry 4861 (class 2604 OID 57525)
-- Name: inpatient_admissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inpatient_admissions ALTER COLUMN id SET DEFAULT nextval('public.inpatient_admissions_id_seq'::regclass);


--
-- TOC entry 4891 (class 2604 OID 90320)
-- Name: lab_test_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lab_test_types ALTER COLUMN id SET DEFAULT nextval('public.lab_test_types_id_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 90303)
-- Name: lab_tests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lab_tests ALTER COLUMN id SET DEFAULT nextval('public.lab_tests_id_seq'::regclass);


--
-- TOC entry 4895 (class 2604 OID 98504)
-- Name: physical_examinations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.physical_examinations ALTER COLUMN id SET DEFAULT nextval('public.physical_examinations_id_seq'::regclass);


--
-- TOC entry 4860 (class 2604 OID 49357)
-- Name: symptom_heads symptom_head_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.symptom_heads ALTER COLUMN symptom_head_id SET DEFAULT nextval('public.symptom_heads_symptom_head_id_seq'::regclass);


--
-- TOC entry 4859 (class 2604 OID 49337)
-- Name: symptom_types symptom_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.symptom_types ALTER COLUMN symptom_type_id SET DEFAULT nextval('public.symptom_types_symptom_type_id_seq'::regclass);


--
-- TOC entry 4874 (class 2604 OID 65715)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4848 (class 2604 OID 24617)
-- Name: vital_signs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vital_signs ALTER COLUMN id SET DEFAULT nextval('public.vital_signs_id_seq'::regclass);


--
-- TOC entry 5122 (class 0 OID 32844)
-- Dependencies: 224
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (appointment_id, patient_id, doctor_id, appointment_date, notes, status, created_at, updated_at) FROM stdin;
73	29	113	2025-05-23 08:27:00	this is an appointment	completed	2025-05-23 08:28:03.737094	2025-08-02 14:22:01.579626
75	33	113	2025-08-05 18:30:00	this is just a test appoihtment \n	scheduled	2025-08-02 15:31:36.617217	2025-08-02 15:31:36.617217
51	34	\N	2025-04-15 11:06:00	Antenatal follow up	scheduled	2025-04-05 09:07:02.080861	2025-04-05 09:07:02.080861
53	34	\N	2025-04-05 10:12:00	tt	scheduled	2025-04-05 10:12:36.309778	2025-04-05 10:12:36.309778
54	22	\N	2025-04-05 10:27:00	drug follow up	scheduled	2025-04-05 10:27:42.973944	2025-04-05 10:27:42.973944
76	47	112	2025-08-08 15:08:00	this is another example appointment\n	canceled	2025-08-02 15:32:02.303868	2025-08-04 15:09:49.199692
\.


--
-- TOC entry 5136 (class 0 OID 57554)
-- Dependencies: 238
-- Data for Name: bed_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bed_groups (id, group_name, created_at, updated_at) FROM stdin;
4	VIP Ward - Ground Floor	2025-05-09 09:48:04.499774	2025-05-09 09:49:58.809852
\.


--
-- TOC entry 5134 (class 0 OID 57543)
-- Dependencies: 236
-- Data for Name: bed_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bed_types (id, type_name, created_at, updated_at) FROM stdin;
7	Standard	2025-05-09 10:08:41.344103	2025-05-09 10:09:41.028744
8	Vip	2025-05-09 10:08:55.064079	2025-05-09 10:09:52.254403
9	Normal	2025-05-09 10:11:19.940909	2025-05-09 10:11:38.727756
\.


--
-- TOC entry 5138 (class 0 OID 57565)
-- Dependencies: 240
-- Data for Name: beds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.beds (id, bed_type_id, bed_group_id, bed_name, used, created_at, updated_at) FROM stdin;
11	9	4	TF-11	t	2025-05-19 14:29:22.986468	2025-05-23 08:52:22.44735
6	7	4	TF-12	t	2025-05-09 10:29:22.533252	2025-05-23 08:52:26.595279
\.


--
-- TOC entry 5144 (class 0 OID 82112)
-- Dependencies: 246
-- Data for Name: bill_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bill_items (id, bill_id, description, unit_price, quantity) FROM stdin;
1	1	goon	3.00	14
2	1	erfgerfg	3.00	1
3	3	Appointment	32.00	1
4	4	Accomodation	4000.00	4
5	4	Ibuprofen	455.00	1
6	5	gooner43	3.00	13
\.


--
-- TOC entry 5142 (class 0 OID 82096)
-- Dependencies: 244
-- Data for Name: bills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bills (id, bill_number, patient_id, issued_by, bill_date, subtotal, discount, tax, total_amount, status, payment_method, amount_paid, payment_date, notes, updated_by, updated_at) FROM stdin;
1	BILL-2025-08-08-4086fdf2	2	Super Admin	2025-08-08 00:00:00	45.00	32.00	3.00	13.00	cancelled	cash	3000.00	2025-08-18 16:23:00	ergegr	Super Admin	2025-08-09 17:58:55.568255
3	BILL-2025-08-09-9429d083	2	Super Admin	2025-08-09 00:00:00	32.00	0.00	0.00	32.00	unpaid	bank_transfer	12.00	2025-08-09 18:06:00	this is for appointment 	\N	\N
4	BILL-2025-08-09-01738e74	2	Super Admin	2025-08-09 00:00:00	16455.00	0.00	0.00	16455.00	paid	cash	16455.00	2025-08-21 18:10:00	this is a test bill for a patient 	Super Admin	2025-08-09 19:12:29.976232
5	BILL-2025-08-11-f51d3480	34	Super Admin	2025-08-11 00:00:00	39.00	0.00	0.00	39.00	overdue	card	44.00	2025-08-15 10:05:00	this is for the thing that he bought yesterday 	\N	\N
\.


--
-- TOC entry 5126 (class 0 OID 49258)
-- Dependencies: 228
-- Data for Name: birth_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.birth_records (birth_id, child_name, gender, birth_date, mother_name, father_name, weight, phone_number, address, report, created_at, updated_at) FROM stdin;
5	Glory Umeh	Female	2025-05-18	Mrs. Franca Onyekwelu 	James	23.00	656565656	this is an address	died by goning	2025-05-18 19:11:22.032232+01	2025-05-18 19:11:22.032232+01
\.


--
-- TOC entry 5150 (class 0 OID 98480)
-- Dependencies: 252
-- Data for Name: complaints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.complaints (id, recorded_by, created_at, patient_id, complaint) FROM stdin;
1	Super Admin	2025-08-11 16:13:15.351897	22	i have the inexplainable urge to goon 
2	Super Admin	2025-08-11 16:16:00.808564	22	i still want to goon though but it's aii..
3	Super Admin	2025-08-11 16:17:01.092754	22	hey
4	Super Admin	2025-08-12 12:53:13.451502	22	i feel like bussin
5	Super Admin	2025-08-12 12:53:35.077766	22	i just felt like complaining, lol. Do not mind me 
6	Super Admin	2025-08-12 17:49:44.300266	22	erbjuerg
\.


--
-- TOC entry 5156 (class 0 OID 106687)
-- Dependencies: 258
-- Data for Name: conditions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conditions (condition_id, name) FROM stdin;
\.


--
-- TOC entry 5124 (class 0 OID 41113)
-- Dependencies: 226
-- Data for Name: death_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.death_records (id, patient_id, death_date, guardian, attachment, report) FROM stdin;
16	29	2025-05-19 15:09:00	Romani Canti	\N	Gooning
\.


--
-- TOC entry 5154 (class 0 OID 106672)
-- Dependencies: 256
-- Data for Name: diagnoses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diagnoses (diagnosis_id, patient_id, recorded_by, diagnosis_date, condition, notes) FROM stdin;
\.


--
-- TOC entry 5120 (class 0 OID 32833)
-- Dependencies: 222
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctors (doctor_id, first_name, last_name, specialty, created_at) FROM stdin;
112	Quandale 	Dingle	Oral and Maxillofacial Surgery	2025-04-05 16:45:12.706959
113	Gomeh	Sanchez	Neurosurgery	2025-04-05 16:52:56.3373
\.


--
-- TOC entry 5132 (class 0 OID 57522)
-- Dependencies: 234
-- Data for Name: inpatient_admissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inpatient_admissions (id, patient_id, symptom_types, symptom_description, note, previous_medical_issue, admission_date, consultant_doctor_id, bed_group, bed_number, created_at, updated_at) FROM stdin;
4	30	{"Stomach problems","Lung problems","Eating or weight problems","Emotional problems"}	Constant or severe abdominal pain.\t: Diseases that affect the digestive system can also cause chronic abdominal pain. The most common are: gastroesophageal reflux disease (GERD) irritable bowel syndrome or spastic colon (a disorder that causes abdominal pain, cramping, and changes in bowel movements)\n\n\nBladder leakage\t: Urinary incontinence — the loss of bladder control — is a common and often embarrassing problem. The severity ranges from occasionally leaking urine when you cough or sneeze to having an urge to urinate that's so sudden and strong you don't get to a toilet in time.\n\n	these are the emotional problems	Cancer	2025-05-22 00:00:00	112			2025-05-22 08:09:56.359398	2025-05-22 08:09:56.359398
5	28	{"Stomach problems"}	Constant or severe abdominal pain.\t: Diseases that affect the digestive system can also cause chronic abdominal pain. The most common are: gastroesophageal reflux disease (GERD) irritable bowel syndrome or spastic colon (a disorder that causes abdominal pain, cramping, and changes in bowel movements)\n \n\n	this is just a note	they have previous medical issues 	2025-08-17 00:00:00	113		TF-12 VIP Ward - Ground Floor	2025-08-01 21:06:11.349096	2025-08-01 21:06:11.349096
6	22	{"Emotional problems"}	Feeling sad or down: Personality change in a way that seems different for that person.\n\n	thisis the tim e	erergf	2025-08-01 00:00:00	113		TF-12 VIP Ward - Ground Floor	2025-08-01 21:09:41.933796	2025-08-01 21:09:41.933796
\.


--
-- TOC entry 5148 (class 0 OID 90317)
-- Dependencies: 250
-- Data for Name: lab_test_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lab_test_types (id, name, description, created_at) FROM stdin;
1	Blood Test	General blood analysis including CBC, lipid profile, etc.	2025-08-10 11:34:10.212798
2	Urine Analysis	Checks for infections, kidney problems, and other conditions.	2025-08-10 11:34:10.212798
3	X-Ray	Radiographic imaging for bones and soft tissues.	2025-08-10 11:34:10.212798
4	MRI Scan	Magnetic resonance imaging for detailed body scans.	2025-08-10 11:34:10.212798
5	ECG	Electrocardiogram to measure heart activity.	2025-08-10 11:34:10.212798
7	Liver Function Test	Checks liver enzyme and protein levels.	2025-08-10 11:34:10.212798
8	Kidney Function Test	Measures creatinine, urea, and electrolyte balance.	2025-08-10 11:34:10.212798
9	Stool Test	Detects digestive tract disorders and infections.	2025-08-10 11:34:10.212798
10	Blood Sugar Test	Measures glucose levels in the blood.	2025-08-10 11:34:10.212798
11	Allergy Test	Identifies allergic reactions to specific substances.	2025-08-10 11:34:10.212798
12	Thyroid Function Test	Measures TSH, T3, and T4 hormone levels.	2025-08-10 11:34:10.212798
13	Pregnancy Test	Detects the presence of hCG hormone in urine or blood.	2025-08-10 11:34:10.212798
14	HIV Test	Screening for HIV infection.	2025-08-10 11:34:10.212798
15	Malaria Test	Detects malaria parasites in the blood.	2025-08-10 11:34:10.212798
16	Cholesterol Test	Measures total cholesterol, HDL, LDL, and triglycerides.	2025-08-10 11:34:10.212798
17	Hemoglobin Test	Measures hemoglobin levels to check for anemia.	2025-08-10 11:34:10.212798
18	Echocardiogram	Ultrasound test to evaluate heart function and structures.	2025-08-10 11:34:10.212798
19	CT Scan	Detailed cross-sectional imaging using computed tomography.	2025-08-10 11:34:10.212798
20	Bone Density Test	Measures bone mineral density for osteoporosis detection.	2025-08-10 11:34:10.212798
\.


--
-- TOC entry 5146 (class 0 OID 90300)
-- Dependencies: 248
-- Data for Name: lab_tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lab_tests (id, patient_id, prescribed_by, test_type, status, comments, results, created_at, updated_at) FROM stdin;
1	22	Super Admin	ECG	to do	ECG Test, check their balls for lumps	\N	2025-08-10 20:41:51.663079	2025-08-10 20:41:51.663079
2	47	Super Admin	MRI Scan	to do	this is for the patient mri	\N	2025-08-11 08:17:55.822649	2025-08-11 08:17:55.822649
3	47	Super Admin	Liver Function Test	failed	this is for the patient liver 		2025-08-11 08:18:10.500762	2025-08-11 13:29:25.449905
4	47	Super Admin	Malaria Test	failed	test for plasmodium\n	he could not handle it \n	2025-08-11 08:19:07.896293	2025-08-11 13:29:41.051915
5	47	Super Admin	Kidney Function Test	failed	this is it 	he has cancer	2025-08-11 09:06:01.160223	2025-08-11 13:52:04.649477
6	22	Super Admin	Stool Test	done	test for stool	we have tested for whatever	2025-08-11 14:49:49.272591	2025-08-11 14:51:45.046564
7	22	Super Admin	X-Ray	to do	hjhh	\N	2025-08-12 15:17:59.158474	2025-08-12 15:17:59.158474
\.


--
-- TOC entry 5115 (class 0 OID 24577)
-- Dependencies: 217
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patients (patient_id, date, hospital_number, first_name, other_names, sex, marital_status, date_of_birth, phone_number, address, occupation, place_of_work_address, religion, nationality, next_of_kin, relationship, next_of_kin_phone, next_of_kin_address, past_surgical_history, family_history, social_history, drug_history, allergies, dietary_restrictions, diet_allergies_to_drugs, past_medical_history, surname, patient_type) FROM stdin;
22	2023-10-07	1007	David	Patrick	Male	Married	1972-09-14	555-3322	258 Cedar Ln, Central City	Architect	Design Tower, Central City	Hindu	South African	Susan Moore	Wife	555-4433	258 Cedar Ln, Central City	Gallbladder removal (2018)	Colon cancer in uncle	Occasional cigar use	Omeprazole 20mg daily	None	Avoid spicy foods	None	GERD	Moore	\N
23	2023-10-08	1008	Jessica	Marie	Female	Single	1988-04-25	555-7788	753 Walnut St, Coast City	Lawyer	Justice Building, Coast City	Muslim	French	Brian Taylor	Brother	555-8899	753 Walnut St, Coast City	Wisdom teeth removal (2015)	Alzheimers in grandmother	Regular exerciser	Sertraline 50mg daily	Codeine	Halal diet	SSRIs	Depression	Taylor	\N
28	2023-10-03	1013	Michael	\N	Male	Divorced	1978-12-01	555-1122	456 Pine St, Metropolis	Accountant	789 Business Park, Metropolis	Atheist	British	Emily Brown	Daughter	555-3344	456 Pine St, Metropolis	Knee replacement (2020)	Heart disease in father	Former smoker (quit 2015)	Metformin 500mg bid	Shellfish	Low-carb diet	Iodine contrast	Type 2 Diabetes	Brown	\N
21	2023-10-05	1006	Linda	Ann	Female	Single	1995-11-29	34534534534	987 Maple Dr, Star City	Nurse	Star City General Hospital	Buddhist	Indian	Richard Miller	Father	345345345345	987 Maple Dr, Star City	C-section (2020)	Migraines in mother	Yoga practitioner	Sumatriptan prn	Latex	Vegetarian	Opioids	Migraines	Miller	\N
29	2023-10-04	1014	Emma	Grace	Female	Widowed	1955-03-19	555-9988	321 Elm Cir, Smallville	Retired	N/A	Methodist	Australian	James Davis	Son	555-6677	321 Elm Cir, Smallville	Hip fracture repair (2022)	Osteoporosis in mother	Never smoked	Calcium supplements	NSAIDs	High-calcium diet	Aspirin	Osteoporosis	Davis	\N
30	2023-10-05	1015	Robert	James	Male	Married	1982-07-04	555-1234	654 Birch Ave, Gotham	Firefighter	Gotham Fire Station	Catholic	Irish	Mary Wilson	Wife	555-4321	654 Birch Ave, Gotham	Appendectomy (1999)	Stroke in grandfather	Social drinker	Atorvastatin 40mg daily	Pollen	Low-fat diet	None	Hyperlipidemia	Wilson	\N
34	2023-10-09	1019	Daniel	Lee	Male	Divorced	1965-01-12	555-0011	159 Spruce Rd, Emerald City	Contractor	Self-employed	Lutheran	Norwegian	Karen Anderson	Sister	555-0022	159 Spruce Rd, Emerald City	Shoulder surgery (2019)	Lung cancer in father	Ex-smoker (2 packs/day)	Tiotropium inhaler daily	Dust mites	High-protein diet	Macrolides	COPD	Anderson	\N
35	2023-10-10	1020	Sophia	Rose	Female	Married	1992-06-08	555-1122	357 Oakwood Ave, National City	Graphic Designer	Creative Studios, National City	Sikh	Mexican	Carlos Thomas	Husband	555-2233	357 Oakwood Ave, National City	Ovarian cyst removal (2021)	Diabetes in both parents	Vegetarian	Metformin 850mg daily	Peanuts	Vegetarian diet	None	PCOS	Thomas	\N
33	2023-10-07	1018	Jessica	Marie	Female	Single	1988-04-24	734783483	753 Walnut St, Coast City	Lawyer	Justice Building, Coast City	Other	Norwegian	Germaine Tanya	Wife	08134567456	No. 32 graceland avenue, lagos nigeria	Wisdom teeth removal (2015)	Alzheimers in grandmother	Regular exerciser	Sertraline 50mg daily	Codeine	Halal diet	SSRIs	Depression	Taylor	\N
47	2025-08-14	2002	Quandale	James	Female	Widowed	2025-08-12	08033352682	this is my address for now 	Firefighter	this is not right at all	Traditional	American	Richard Miller	Father	555002223	this is the address of my next of kin									Miller	\N
\.


--
-- TOC entry 5152 (class 0 OID 98501)
-- Dependencies: 254
-- Data for Name: physical_examinations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.physical_examinations (id, patient_id, recorded_by, created_at, general_appearance, heent, cardiovascular, respiration, gastrointestinal, gynecology_obstetrics, musculoskeletal, neurological, skin, findings) FROM stdin;
6	22	Super Admin	2025-08-12 14:15:18.036974	Well-nourished, alert, and oriented	No abnormalities in head, eyes, ears, nose, or throat	Normal heart rate and rhythm, no murmurs	Clear breath sounds, no wheezing or crackles	Abdomen soft, non-tender, normal bowel sounds	No abnormalities detected	Full range of motion, no swelling or tenderness	Normal reflexes and sensation	No rashes or lesions	Overall good health, no significant findings
7	22	Super Admin	2025-08-11 14:15:18.036974	Mild fatigue, otherwise stable	Mild conjunctival redness in both eyes	Regular rhythm, slight tachycardia	Slight wheezing in left lung base	Mild abdominal tenderness in lower quadrant	Not applicable	Muscle stiffness reported in lower back	Sensation intact, reflexes normal	Dry skin on forearms	Signs of mild seasonal allergy and dehydration
8	22	Dr. Ahmed Musa	2025-08-10 14:15:18.036974	Pale appearance, mildly underweight	Normal HEENT exam	Systolic murmur noted	Normal breathing pattern, clear lung sounds	Distended abdomen with mild tenderness	Not applicable	Joint pain in both knees	Normal coordination, mild hand tremor	Eczema on both hands	Possible early anemia and gastrointestinal bloating
9	22	Super Admin	2025-08-09 14:15:18.036974	Well-appearing, no distress	Clear HEENT	Strong, regular pulse, no murmurs	Unlabored breathing, no adventitious sounds	Abdomen flat, bowel sounds present	Not applicable	Normal muscle tone and strength	Alert and oriented, reflexes normal	No lesions or rashes	Normal examination, no acute issues
10	22	Super Admin	2025-08-08 14:15:18.036974	Lethargic, mild distress	Nasal congestion, mild ear discomfort	Rapid heartbeat, irregular rhythm	Labored breathing, crackles at lung bases	Tenderness in right upper abdomen	Not applicable	Limited shoulder movement due to pain	Mild confusion, slow response to questions	Bruising on left arm	Possible pneumonia with underlying cardiovascular issue
11	22	Super Admin	2025-08-12 17:27:01.581604	he chill, can't lie 	they all chill	they all chill	they all chill	they all chill	they all chill	they all chill	they all chill	they all chill	he can goon at high speed
\.


--
-- TOC entry 5130 (class 0 OID 49354)
-- Dependencies: 232
-- Data for Name: symptom_heads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.symptom_heads (symptom_head_id, symptom_head, symptom_type_id, symptom_description) FROM stdin;
4	Atopic dermatitis (Eczema)\t	5	Atopic dermatitis usually develops in early childhood and is more common in people who have a family history of the condition.
7	Asthma	8	Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out and shortness of breath. For some people, asthma is a minor nuisance.
8	Feeling sad or down	3	Personality change in a way that seems different for that person.
5	Bladder leakage\t	8	Urinary incontinence — the loss of bladder control — is a common and often embarrassing problem. The severity ranges from occasionally leaking urine when you cough or sneeze to having an urge to urinate that's so sudden and strong you don't get to a toilet in time.
6	Constant or severe abdominal pain.\t	7	Diseases that affect the digestive system can also cause chronic abdominal pain. The most common are: gastroesophageal reflux disease (GERD) irritable bowel syndrome or spastic colon (a disorder that causes abdominal pain, cramping, and changes in bowel movements)\n
1	Thirst	6	Thirst is the feeling of needing to drink something. It occurs whenever the body is dehydrated for any reason. Any condition that can result in a loss of body water can lead to thirst or excessive thirst.
3	Cramps and injuries	4	Muscle pain: Muscle spasms, cramps and injuries can all cause muscle pain. Some infections or tumors may also lead to muscle pain. Tendon and ligament pain: Ligaments and tendons are strong bands of tissue that connect your joints and bones. Sprains, strains and overuse injuries can lead to tendon or ligament pain.
\.


--
-- TOC entry 5128 (class 0 OID 49334)
-- Dependencies: 230
-- Data for Name: symptom_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.symptom_types (symptom_type_id, symptom_text) FROM stdin;
7	Stomach problems
8	Lung problems
4	Muscle or joint problems
5	Skin problems
2	Eating or weight problems
3	Emotional problems
6	Bladder problems
\.


--
-- TOC entry 5140 (class 0 OID 65712)
-- Dependencies: 242
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_hash, role, refresh_token, created_by, created_at, name) FROM stdin;
2	admin@localhost.com	$2b$12$WBxFRCPFXpyVFb15plwNGOt706EWfeIutCQxaM4Kh1iyrPp4J5qVO	superadmin	f617da0e9efa11400c8b17bcd4f20b45311ebce2746b74560aa1b6fe71d9c078	\N	2025-08-04 19:51:12.398176+01	Super Admin
\.


--
-- TOC entry 5118 (class 0 OID 24614)
-- Dependencies: 220
-- Data for Name: vital_signs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vital_signs (id, patient_id, recorded_at, temperature, blood_pressure_systolic, blood_pressure_diastolic, weight, pulse_rate, spo2, recorded_by, created_at) FROM stdin;
4	28	2025-08-11 00:00:00	45	4	34	54	65	13	\N	\N
5	28	2025-08-11 00:00:00	45	4	34	54	65	13	\N	\N
6	22	2025-08-11 00:00:00	45	34	34	34	44	94	Super Admin	\N
7	22	2025-08-11 00:00:00	45	34	34	34	44	94	Super Admin	\N
8	22	2025-08-11 00:00:00	45	34	34	34	44	94	Super Admin	2025-08-11 18:00:03.200063
9	22	2025-08-11 00:00:00	0	0	0	0	0	0	Super Admin	2025-08-11 18:02:36.775712
10	22	2025-08-11 00:00:00	4	34	4	99	2	18	Super Admin	2025-08-11 18:36:19.332592
11	22	2025-08-12 00:00:00	35	60	20	32	97	34	Super Admin	2025-08-12 13:00:29.889522
12	22	2025-08-12 00:00:00	20	34	5	4	88	4	Super Admin	2025-08-12 13:01:59.700982
13	22	2025-08-12 00:00:00	43	22	23	23	2	23	Super Admin	2025-08-12 13:02:43.032183
14	22	2025-08-12 00:00:00	37.2	139	89	34	80	90	Super Admin	2025-08-12 17:54:46.767876
\.


--
-- TOC entry 5185 (class 0 OID 0)
-- Dependencies: 223
-- Name: appointments_appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_appointment_id_seq', 76, true);


--
-- TOC entry 5186 (class 0 OID 0)
-- Dependencies: 237
-- Name: bed_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bed_groups_id_seq', 4, true);


--
-- TOC entry 5187 (class 0 OID 0)
-- Dependencies: 235
-- Name: bed_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bed_types_id_seq', 9, true);


--
-- TOC entry 5188 (class 0 OID 0)
-- Dependencies: 239
-- Name: beds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.beds_id_seq', 12, true);


--
-- TOC entry 5189 (class 0 OID 0)
-- Dependencies: 245
-- Name: bill_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bill_items_id_seq', 6, true);


--
-- TOC entry 5190 (class 0 OID 0)
-- Dependencies: 243
-- Name: bills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bills_id_seq', 5, true);


--
-- TOC entry 5191 (class 0 OID 0)
-- Dependencies: 227
-- Name: birth_records_reference_number_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.birth_records_reference_number_seq', 5, true);


--
-- TOC entry 5192 (class 0 OID 0)
-- Dependencies: 251
-- Name: complaints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.complaints_id_seq', 6, true);


--
-- TOC entry 5193 (class 0 OID 0)
-- Dependencies: 257
-- Name: conditions_condition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conditions_condition_id_seq', 1, false);


--
-- TOC entry 5194 (class 0 OID 0)
-- Dependencies: 225
-- Name: death_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.death_records_id_seq', 16, true);


--
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 255
-- Name: diagnoses_diagnosis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.diagnoses_diagnosis_id_seq', 1, false);


--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 221
-- Name: doctors_doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctors_doctor_id_seq', 113, true);


--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 233
-- Name: inpatient_admissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inpatient_admissions_id_seq', 6, true);


--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 249
-- Name: lab_test_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lab_test_types_id_seq', 21, true);


--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 247
-- Name: lab_tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lab_tests_id_seq', 7, true);


--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 218
-- Name: patients_patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patients_patient_id_seq', 47, true);


--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 253
-- Name: physical_examinations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.physical_examinations_id_seq', 12, true);


--
-- TOC entry 5202 (class 0 OID 0)
-- Dependencies: 231
-- Name: symptom_heads_symptom_head_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.symptom_heads_symptom_head_id_seq', 10, true);


--
-- TOC entry 5203 (class 0 OID 0)
-- Dependencies: 229
-- Name: symptom_types_symptom_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.symptom_types_symptom_type_id_seq', 9, true);


--
-- TOC entry 5204 (class 0 OID 0)
-- Dependencies: 241
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- TOC entry 5205 (class 0 OID 0)
-- Dependencies: 219
-- Name: vital_signs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vital_signs_id_seq', 14, true);


--
-- TOC entry 4910 (class 2606 OID 32855)
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (appointment_id);


--
-- TOC entry 4926 (class 2606 OID 57563)
-- Name: bed_groups bed_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed_groups
    ADD CONSTRAINT bed_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 4924 (class 2606 OID 57552)
-- Name: bed_types bed_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed_types
    ADD CONSTRAINT bed_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4928 (class 2606 OID 57575)
-- Name: beds beds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beds
    ADD CONSTRAINT beds_pkey PRIMARY KEY (id);


--
-- TOC entry 4939 (class 2606 OID 82121)
-- Name: bill_items bill_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_items
    ADD CONSTRAINT bill_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4935 (class 2606 OID 82110)
-- Name: bills bills_bill_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bills_bill_number_key UNIQUE (bill_number);


--
-- TOC entry 4937 (class 2606 OID 82108)
-- Name: bills bills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bills_pkey PRIMARY KEY (id);


--
-- TOC entry 4914 (class 2606 OID 49267)
-- Name: birth_records birth_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.birth_records
    ADD CONSTRAINT birth_records_pkey PRIMARY KEY (birth_id);


--
-- TOC entry 4947 (class 2606 OID 98486)
-- Name: complaints complaints_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_pkey PRIMARY KEY (id);


--
-- TOC entry 4953 (class 2606 OID 106696)
-- Name: conditions conditions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conditions
    ADD CONSTRAINT conditions_name_key UNIQUE (name);


--
-- TOC entry 4955 (class 2606 OID 106694)
-- Name: conditions conditions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conditions
    ADD CONSTRAINT conditions_pkey PRIMARY KEY (condition_id);


--
-- TOC entry 4912 (class 2606 OID 41120)
-- Name: death_records death_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.death_records
    ADD CONSTRAINT death_records_pkey PRIMARY KEY (id);


--
-- TOC entry 4951 (class 2606 OID 106680)
-- Name: diagnoses diagnoses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diagnoses
    ADD CONSTRAINT diagnoses_pkey PRIMARY KEY (diagnosis_id);


--
-- TOC entry 4908 (class 2606 OID 32840)
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (doctor_id);


--
-- TOC entry 4922 (class 2606 OID 57531)
-- Name: inpatient_admissions inpatient_admissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inpatient_admissions
    ADD CONSTRAINT inpatient_admissions_pkey PRIMARY KEY (id);


--
-- TOC entry 4943 (class 2606 OID 90327)
-- Name: lab_test_types lab_test_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lab_test_types
    ADD CONSTRAINT lab_test_types_name_key UNIQUE (name);


--
-- TOC entry 4945 (class 2606 OID 90325)
-- Name: lab_test_types lab_test_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lab_test_types
    ADD CONSTRAINT lab_test_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4941 (class 2606 OID 90310)
-- Name: lab_tests lab_tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lab_tests
    ADD CONSTRAINT lab_tests_pkey PRIMARY KEY (id);


--
-- TOC entry 4902 (class 2606 OID 32831)
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (patient_id);


--
-- TOC entry 4949 (class 2606 OID 98509)
-- Name: physical_examinations physical_examinations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.physical_examinations
    ADD CONSTRAINT physical_examinations_pkey PRIMARY KEY (id);


--
-- TOC entry 4920 (class 2606 OID 49361)
-- Name: symptom_heads symptom_heads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.symptom_heads
    ADD CONSTRAINT symptom_heads_pkey PRIMARY KEY (symptom_head_id);


--
-- TOC entry 4916 (class 2606 OID 49341)
-- Name: symptom_types symptom_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.symptom_types
    ADD CONSTRAINT symptom_types_pkey PRIMARY KEY (symptom_type_id);


--
-- TOC entry 4918 (class 2606 OID 49343)
-- Name: symptom_types symptom_types_symptom_text_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.symptom_types
    ADD CONSTRAINT symptom_types_symptom_text_key UNIQUE (symptom_text);


--
-- TOC entry 4904 (class 2606 OID 32876)
-- Name: patients unique_hospital_number; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT unique_hospital_number UNIQUE (hospital_number);


--
-- TOC entry 4931 (class 2606 OID 65723)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4933 (class 2606 OID 65721)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4906 (class 2606 OID 24621)
-- Name: vital_signs vital_signs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vital_signs
    ADD CONSTRAINT vital_signs_pkey PRIMARY KEY (id);


--
-- TOC entry 4929 (class 1259 OID 65729)
-- Name: idx_users_role; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_role ON public.users USING btree (role);


--
-- TOC entry 4956 (class 2606 OID 32861)
-- Name: appointments appointments_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(doctor_id) ON DELETE SET NULL;


--
-- TOC entry 4957 (class 2606 OID 32856)
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id) ON DELETE CASCADE;


--
-- TOC entry 4962 (class 2606 OID 57581)
-- Name: beds beds_bed_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beds
    ADD CONSTRAINT beds_bed_group_id_fkey FOREIGN KEY (bed_group_id) REFERENCES public.bed_groups(id) ON DELETE RESTRICT;


--
-- TOC entry 4963 (class 2606 OID 57576)
-- Name: beds beds_bed_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beds
    ADD CONSTRAINT beds_bed_type_id_fkey FOREIGN KEY (bed_type_id) REFERENCES public.bed_types(id) ON DELETE RESTRICT;


--
-- TOC entry 4965 (class 2606 OID 82122)
-- Name: bill_items bill_items_bill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_items
    ADD CONSTRAINT bill_items_bill_id_fkey FOREIGN KEY (bill_id) REFERENCES public.bills(id) ON DELETE CASCADE;


--
-- TOC entry 4967 (class 2606 OID 98487)
-- Name: complaints complaints_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);


--
-- TOC entry 4958 (class 2606 OID 41121)
-- Name: death_records death_records_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.death_records
    ADD CONSTRAINT death_records_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);


--
-- TOC entry 4969 (class 2606 OID 106681)
-- Name: diagnoses diagnoses_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diagnoses
    ADD CONSTRAINT diagnoses_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);


--
-- TOC entry 4960 (class 2606 OID 57537)
-- Name: inpatient_admissions inpatient_admissions_consultant_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inpatient_admissions
    ADD CONSTRAINT inpatient_admissions_consultant_doctor_id_fkey FOREIGN KEY (consultant_doctor_id) REFERENCES public.doctors(doctor_id);


--
-- TOC entry 4961 (class 2606 OID 57532)
-- Name: inpatient_admissions inpatient_admissions_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inpatient_admissions
    ADD CONSTRAINT inpatient_admissions_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id) ON DELETE CASCADE;


--
-- TOC entry 4966 (class 2606 OID 90311)
-- Name: lab_tests lab_tests_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lab_tests
    ADD CONSTRAINT lab_tests_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id) ON DELETE CASCADE;


--
-- TOC entry 4968 (class 2606 OID 98510)
-- Name: physical_examinations physical_examinations_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.physical_examinations
    ADD CONSTRAINT physical_examinations_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id) ON DELETE CASCADE;


--
-- TOC entry 4959 (class 2606 OID 49362)
-- Name: symptom_heads symptom_heads_symptom_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.symptom_heads
    ADD CONSTRAINT symptom_heads_symptom_type_id_fkey FOREIGN KEY (symptom_type_id) REFERENCES public.symptom_types(symptom_type_id);


--
-- TOC entry 4964 (class 2606 OID 65724)
-- Name: users users_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


-- Completed on 2025-08-12 19:02:46

--
-- PostgreSQL database dump complete
--

