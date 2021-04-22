import {
  FEATURE_ENROLL_WITH_CODES,
  FEATURE_LANGUAGE_FACET,
  FEATURE_PROGRAM_TITLES_FACET,
} from '../../constants';
import { paramsToObject } from '../data/utils';

const hasFeatureFlagEnabled = (featureFlag) => {
  const searchParams = new URLSearchParams(window.location.search);
  const { features } = paramsToObject(searchParams);
  return features && features.split(',').includes(featureFlag);
};

const features = {
  ENROLL_WITH_CODES: process.env.FEATURE_ENROLL_WITH_CODES || hasFeatureFlagEnabled(FEATURE_ENROLL_WITH_CODES),
  LANGUAGE_FACET: process.env.FEATURE_LANGUAGE_FACET || hasFeatureFlagEnabled(FEATURE_LANGUAGE_FACET),
  PROGRAM_TITLES_FACET: (
    process.env.FEATURE_PROGRAM_TITLES_FACET || hasFeatureFlagEnabled(FEATURE_PROGRAM_TITLES_FACET)
  ),
};

// eslint-disable-next-line import/prefer-default-export
export { features };
