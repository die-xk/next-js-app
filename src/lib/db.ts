import mysql from 'mysql2/promise'
import { User, Analysis, AnalysisResult } from '@/types/database'
import { SubscriptionTier } from '@/types/subscription';

const pool = mysql.createPool({
  host: 'sql322.your-server.de',
  user: 'startuplens',
  password: 'rp8Qg3YAb27fnPjw',
  database: 'startuplens',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export async function executeQuery<T>({ 
  query, 
  values 
}: { 
  query: string; 
  values?: any[] 
}): Promise<T> {
  try {
    const [results] = await pool.execute(query, values)
    return results as T
  } catch (error: any) {
    throw new Error(`Database error: ${error.message}`)
  }
}

// User operations
export async function createUser(
  id: string, 
  email: string, 
  name?: string | null, 
  image?: string | null
) {
  try {
    await pool.getConnection()

    const query = `
      INSERT INTO users (id, email, name, image_url)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        email = VALUES(email),
        name = VALUES(name),
        image_url = VALUES(image_url)
    `
    
    return await executeQuery({ 
      query, 
      values: [id, email, name, image] 
    })
  } catch (error) {
    throw error
  }
}

// Analysis operations
export async function saveAnalysis({
  id,
  userId,
  title,
  description,
  targetMarket,
  businessModel,
  stage,
  challenges,
  persona,
  analysisResult
}: {
  id: string
  userId: string
  title: string
  description: string
  targetMarket: string
  businessModel: string
  stage: string
  challenges: string
  persona: string
  analysisResult: AnalysisResult
}): Promise<void> {
  const query = `
    INSERT INTO analyses (
      id,
      user_id,
      title,
      description,
      target_market,
      business_model,
      stage,
      challenges,
      persona,
      analysis_result,
      created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `
  
  await executeQuery<void>({
    query,
    values: [
      id,
      userId,
      title,
      description,
      targetMarket,
      businessModel,
      stage,
      challenges,
      persona,
      JSON.stringify(analysisResult)
    ]
  })
}

export async function getUserAnalyses(userId: string): Promise<Analysis[]> {
  const query = `
    SELECT 
      id,
      title,
      description,
      target_market,
      business_model,
      stage,
      challenges,
      persona,
      analysis_result,
      created_at
    FROM analyses
    WHERE user_id = ?
    ORDER BY created_at DESC
  `
  
  const analyses = await executeQuery<Analysis[]>({ 
    query, 
    values: [userId] 
  })
  
  return analyses.map(analysis => ({
    ...analysis,
    analysis_result: JSON.parse(analysis.analysis_result as unknown as string)
  }))
}

export async function getAnalysisById(id: string, userId: string): Promise<Analysis | null> {
  const query = `
    SELECT 
      id,
      title,
      description,
      target_market,
      business_model,
      stage,
      challenges,
      persona,
      analysis_result,
      created_at
    FROM analyses
    WHERE id = ? AND user_id = ?
  `
  
  const [analysis] = await executeQuery<Analysis[]>({ 
    query, 
    values: [id, userId] 
  })
  
  if (!analysis) return null
  
  return {
    ...analysis,
    analysis_result: JSON.parse(analysis.analysis_result as unknown as string)
  }
}

export async function deleteAnalysis(id: string, userId: string): Promise<void> {
  const query = `
    DELETE FROM analyses 
    WHERE id = ? AND user_id = ?
  `
  
  await executeQuery<void>({
    query,
    values: [id, userId]
  })
}

export async function saveChatMessage({
  id,
  analysisId,
  userId,
  role,
  content
}: {
  id: string
  analysisId: string
  userId: string
  role: 'user' | 'ai'
  content: string
}) {
  const query = `
    INSERT INTO chat_messages (id, analysis_id, user_id, role, content)
    VALUES (?, ?, ?, ?, ?)
  `
  
  await executeQuery({
    query,
    values: [id, analysisId, userId, role, content]
  })
}

export async function getChatMessages(analysisId: string, userId: string) {
  const query = `
    SELECT id, role, content, created_at
    FROM chat_messages
    WHERE analysis_id = ? AND user_id = ?
    ORDER BY created_at ASC
  `
  
  return executeQuery({
    query,
    values: [analysisId, userId]
  })
}

export async function updateUserSubscription(
  userId: string,
  data: {
    tier: SubscriptionTier;
    subscriptionId?: string;
    status?: string;
  }
) {
  const query = `
    UPDATE users
    SET 
      subscription_tier = ?,
      subscription_id = ?,
      subscription_status = ?,
      subscription_updated_at = NOW()
    WHERE id = ?
  `;

  try {
    await executeQuery({
      query,
      values: [data.tier, data.subscriptionId, data.status, userId]
    });
    return true;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw new Error('Failed to update subscription');
  }
}

export async function getUserSubscription(userId: string) {
  const query = `
    SELECT 
      subscription_tier,
      subscription_id,
      subscription_status,
      subscription_updated_at
    FROM users
    WHERE id = ?
  `;

  try {
    const [result] = await executeQuery<any[]>({
      query,
      values: [userId]
    });
    return result || null;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    throw new Error('Failed to fetch subscription');
  }
}

export async function getMonthlyAnalysisCount(userId: string): Promise<number> {
  const query = `
    SELECT COUNT(*) as count
    FROM analyses
    WHERE user_id = ?
    AND created_at >= DATE_FORMAT(NOW() ,'%Y-%m-01')
  `;

  const [result] = await executeQuery<[{count: number}]>({
    query,
    values: [userId]
  });

  return result.count;
} 