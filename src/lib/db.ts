import mysql from 'mysql2/promise'
import { User, Analysis, AnalysisResult } from '@/types/database'

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
      analysis_result
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    SELECT *
    FROM analyses
    WHERE user_id = ?
    ORDER BY created_at DESC
  `
  return executeQuery<Analysis[]>({ query, values: [userId] })
}

export async function getAnalysisById(id: string, userId: string): Promise<Analysis> {
  const query = `
    SELECT *
    FROM analyses
    WHERE id = ? AND user_id = ?
  `
  return executeQuery<Analysis>({ query, values: [id, userId] })
} 