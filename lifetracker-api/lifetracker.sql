\echo 'Delete and recreate users db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE IF EXISTS lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;
-- run lifetracker-schema.sql;

\i lifetracker-schema.sql

\echo 'Delete and recreate nutrition db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE IF EXISTS lifetracker_test;
CREATE DATABASE lifetracker_test;
\connect lifetracker_test;
\i lifetracker-schema.sql;

-- \i lifetracker_test-schema.sql