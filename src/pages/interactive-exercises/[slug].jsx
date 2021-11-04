/* eslint-disable react/prop-types */
import { Box, useColorMode } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Heading from '../../common/components/Heading';
import Link from '../../common/components/NextChakraLink';

export const getStaticPaths = async () => {
  const data = await fetch(
    'https://breathecode-test.herokuapp.com/v1/registry/asset?type=exercise&big=true',
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  const paths = data.map((res) => {
    console.log('RESPONSE_PATH', res.slug);
    return {
      params: { slug: res.slug },
    };
  });
  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  const { slug } = params;

  // <Helmet title={`${data.title} - ${data.difficulty}`} />
  const results = await fetch(
    'https://breathecode-test.herokuapp.com/v1/registry/asset?type=exercise&big=true',
  )
    .then((res) => res.json())
    .then((data) => data.find((e) => e.slug === slug))
    .catch((err) => console.log(err));
  return {
    // props: { data:..., slug:..., more... },
    props: {
      fallback: false,
      ...(await serverSideTranslations(locale, ['navbar', 'footer'])),
      data: results,
    },
  };
};

const ExerciseSlug = ({ data }) => {
  console.log('EXERCISE_DATA:', data);
  const { colorMode } = useColorMode();

  return (
    <Box
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin={{ base: '4% 4% 0 4%', md: '4% 10% 0 10%' }}
    >

      <Link href="/interactive-exercises" display="inline-block" w="full" borderRadius="15px">
        {'< Back to Projects'}
      </Link>

      <Box flex="1" margin={{ base: '4% 4% 0 4%', md: '4% 10% 0 10%' }}>
        <Heading
          as="h1"
          size="xl"
          fontWeight="700"
          color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
          textTransform="uppercase"
        >
          {data.title}
        </Heading>

        <Link
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          size="12px"
          color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
        >
          {data.url}
        </Link>
      </Box>
    </Box>
  );
};

export default ExerciseSlug;