CREATE TABLE "players" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"found_waldo" boolean DEFAULT false NOT NULL,
	"found_odlaw" boolean DEFAULT false NOT NULL,
	"found_wizard" boolean DEFAULT false NOT NULL,
	"found_wilma" boolean DEFAULT false NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"finished_at" timestamp,
	"time_taken" integer
);
