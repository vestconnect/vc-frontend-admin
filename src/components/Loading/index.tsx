import React from 'react';

import { Loading as LoadingStyle } from './styles';

interface LoadingProps {
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ color }) => <LoadingStyle color={color} />

export default Loading;