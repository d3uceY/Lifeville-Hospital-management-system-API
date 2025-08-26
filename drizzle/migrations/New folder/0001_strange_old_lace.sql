CREATE TABLE "discharge_summary" (
	"id" serial PRIMARY KEY NOT NULL,
	"final_diagnosis" text NOT NULL,
	"diagnosis_details" text,
	"treatment_given" text,
	"outcome" text,
	"condition" text,
	"discharge_date_time" timestamp NOT NULL,
	"follow_up" text,
	"patient_id" integer NOT NULL,
	"admission_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"recorded_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inpatient_journal" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"admission_id" integer NOT NULL,
	"recorded_by" text NOT NULL,
	"updated_by" text,
	"comment" text,
	"comments" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_status_check";--> statement-breakpoint
ALTER TABLE "inpatient_admissions" ADD COLUMN "discharge_condition" text DEFAULT 'on admission';--> statement-breakpoint
ALTER TABLE "inpatient_admissions" ADD COLUMN "end_date" timestamp;--> statement-breakpoint
ALTER TABLE "inpatient_journal" ADD CONSTRAINT "inpatient_journal_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("patient_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inpatient_journal" ADD CONSTRAINT "inpatient_journal_admission_id_fkey" FOREIGN KEY ("admission_id") REFERENCES "public"."inpatient_admissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_status_check" CHECK ((status)::text = ANY (
			(ARRAY[
				'scheduled'::character varying,
				'confirmed'::character varying,
				'pending'::character varying,
				'canceled'::character varying,
				'completed'::character varying
			])::text[]
		));