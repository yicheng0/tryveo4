"use server";

import { Locale } from "@/i18n/routing";
import { actionResponse } from "@/lib/action-response";
import { getErrorMessage } from "@/lib/error-utils";
import { isAdmin } from "@/lib/supabase/isAdmin";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export type Tag = Database['public']['Tables']['tags']['Row'];

interface ListTagsResponse {
  success: boolean;
  data?: { tags: Tag[] };
  error?: string;
}

interface CreateTagResponse {
  success: boolean;
  data?: { tag: Tag };
  error?: string;
}

interface UpdateTagResponse {
  success: boolean;
  data?: { tag: Tag };
  error?: string;
}

interface DeleteTagResponse {
  success: boolean;
  error?: string;
}

export async function listTagsAction({
  query,
  locale,
}: {
  query?: string;
  locale?: Locale;
}): Promise<ListTagsResponse> {
  const supabase = await createClient();

  try {
    let queryBuilder = supabase.from("tags").select("*").order('name');

    if (query) {
      queryBuilder = queryBuilder.ilike("name", `%${query}%`);
    }

    const { data: tags, error } = await queryBuilder.limit(100);

    if (error) throw error;

    return actionResponse.success({ tags: tags || [] });
  } catch (error) {
    console.error("List tags action failed:", error);
    const errorMessage = getErrorMessage(error);
    if (errorMessage.includes('permission denied')) {
      return actionResponse.forbidden("Permission denied to view tags.");
    }
    return actionResponse.error(errorMessage);
  }
}


export async function createTagAction({ name, locale }: { name: string, locale: Locale }): Promise<CreateTagResponse> {
  if (!(await isAdmin())) {
    return actionResponse.forbidden("Admin privileges required.");
  }

  const supabaseAdmin = createAdminClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (!name) {
    return actionResponse.badRequest("Tag name are required.");
  }

  try {
    // const { count, error: countError } = await supabaseAdmin
    //   .from('tags')
    //   .select('*', { count: 'exact', head: true });

    // if (countError) {
    //   console.error("Error fetching tag count:", countError);
    //   throw new Error("Failed to fetch tag count.");
    // }

    // if (count !== null && count >= 50) {
    //   return actionResponse.badRequest("Maximum number of tags (50) reached.");
    // }

    const { data: existingTag, error: fetchError } = await supabaseAdmin
      .from('tags')
      .select('id')
      .eq('name', name)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingTag) {
      return actionResponse.conflict(`Tag "${name}" already exists.`);
    }

    const { data: newTag, error: insertError } = await supabaseAdmin
      .from('tags')
      .insert({ name })
      .select()
      .single();

    if (insertError) throw insertError;
    if (!newTag) throw new Error("Failed to create tag, no data returned.");

    return actionResponse.success({ tag: newTag });

  } catch (error) {
    console.error("Create tag action failed:", error);
    const errorMessage = getErrorMessage(error);
    if (errorMessage.includes('duplicate key value violates unique constraint')) {
      return actionResponse.conflict(`Tag "${name}" already exists.`);
    }
    if (errorMessage.includes('permission denied')) {
      return actionResponse.forbidden("Permission denied to create tags.");
    }
    return actionResponse.error(errorMessage);
  }
}

export async function updateTagAction({ id, name, locale }: { id: string, name: string, locale: Locale }): Promise<UpdateTagResponse> {
  if (!(await isAdmin())) {
    return actionResponse.forbidden("Admin privileges required.");
  }

  const supabaseAdmin = createAdminClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (!id || !name) {
    return actionResponse.badRequest("Tag ID and name are required.");
  }

  try {
    const { data: existingTag, error: fetchError } = await supabaseAdmin
      .from('tags')
      .select('id')
      .eq('name', name)
      .not('id', 'eq', id)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingTag) {
      return actionResponse.conflict(`Another tag with the name "${name}" already exists.`);
    }

    const { data: updatedTag, error: updateError } = await supabaseAdmin
      .from('tags')
      .update({ name })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    if (!updatedTag) throw new Error("Failed to update tag, no data returned.");

    return actionResponse.success({ tag: updatedTag });

  } catch (error) {
    console.error("Update tag action failed:", error);
    const errorMessage = getErrorMessage(error);
    if (errorMessage.includes('duplicate key value violates unique constraint')) {
      return actionResponse.conflict(`Tag name "${name}" is already in use by another tag.`);
    }
    if (errorMessage.includes('permission denied')) {
      return actionResponse.forbidden("Permission denied to update tags.");
    }
    return actionResponse.error(errorMessage);
  }
}

export async function deleteTagAction({ id, locale }: { id: string, locale: Locale }): Promise<DeleteTagResponse> {
  if (!(await isAdmin())) {
    return actionResponse.forbidden("Admin privileges required.");
  }

  const supabaseAdmin = createAdminClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (!id) {
    return actionResponse.badRequest("Tag ID is required.");
  }

  try {
    const { error: deleteError } = await supabaseAdmin
      .from('tags')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    return actionResponse.success({});

  } catch (error) {
    console.error("Delete tag action failed:", error);
    const errorMessage = getErrorMessage(error);
    if (errorMessage.includes('permission denied')) {
      return actionResponse.forbidden("Permission denied to delete tags.");
    }
    if (errorMessage.includes('violates foreign key constraint')) {
      return actionResponse.badRequest("Cannot delete tag as it is currently in use by one or more posts.");
    }
    return actionResponse.error(errorMessage);
  }
} 