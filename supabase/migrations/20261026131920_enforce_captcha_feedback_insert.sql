drop policy if exists "anonymous feedback insert" on public.article_feedback;

revoke insert on public.article_feedback from anon, authenticated;
