
import { ProjectImage, Category } from './types';

const BIN_ID = '7b0e386d3ab7341478bf'; 
const API_URL = `https://api.npoint.io/${BIN_ID}`;

/**
 * Fetches all site logs from the npoint cloud storage with robust error catching.
 */
export const getImages = async (): Promise<ProjectImage[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Cloud Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Validate that the returned data is an array
    if (!data) return [];
    if (Array.isArray(data)) return data;
    
    // If npoint returns an empty object {} instead of [], return empty array
    if (typeof data === 'object' && Object.keys(data).length === 0) return [];
    
    console.error("Unexpected data format from cloud:", data);
    return [];
  } catch (error) {
    console.error("Critical Cloud Fetch Failure:", error);
    return [];
  }
};

/**
 * Saves a new field log to the npoint cloud.
 * Implements a check for total data size as npoint has strict limits (~1MB).
 */
export const saveImage = async (
  image: Omit<ProjectImage, 'id' | 'createdAt' | 'url'>, 
  base64Data: string
): Promise<ProjectImage> => {
  // 1. Fetch current remote state
  const currentImages = await getImages();

  // 2. Generate unique log ID
  const newImage: ProjectImage = {
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    url: base64Data, 
    title: image.title || "Untitled Project",
    description: image.description || "No description provided.",
    category: image.category,
    createdAt: Date.now()
  };

  // 3. Prepare updated set
  const updatedImages = [newImage, ...currentImages];
  
  // 4. Size validation check (Estimate)
  const estimatedSize = JSON.stringify(updatedImages).length;
  if (estimatedSize > 1000000) { // 1MB limit check
    throw new Error("Cloud storage capacity exceeded. Please delete older logs to make room.");
  }

  // 5. Re-synchronize with cloud
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedImages)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sync Failed: ${response.status}. ${errorText}`);
  }

  return newImage;
};

/**
 * Removes a field log from the cloud storage.
 */
export const deleteImage = async (id: string): Promise<void> => {
  try {
    const currentImages = await getImages();
    const updatedImages = currentImages.filter(img => img.id !== id);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedImages)
    });
    
    if (!response.ok) throw new Error("Cloud deletion failed.");
  } catch (error) {
    console.error("Delete Error:", error);
    throw error;
  }
};
