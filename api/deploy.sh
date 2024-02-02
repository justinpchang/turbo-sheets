GOOGLE_PROJECT_ID=sheets-scripts-413118
CLOUD_RUN_SERVICE=turbo-sheets

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
  --project=$GOOGLE_PROJECT_ID

gcloud run deploy $CLOUD_RUN_SERVICE \
  --image gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
  --platform managed \
  --region us-east4 \
  --allow-unauthenticated \
  --project=$GOOGLE_PROJECT_ID