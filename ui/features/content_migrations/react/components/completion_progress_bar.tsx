/*
 * Copyright (C) 2023 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import {ProgressBar} from '@instructure/ui-progress'
import {useScope as useI18nScope} from '@canvas/i18n'
import type {ContentMigrationWorkflowState} from './types'

const I18n = useI18nScope('content_migrations_redesign')

export const CompletionProgressBar = ({
  workflowState,
  completion,
}: {
  workflowState: ContentMigrationWorkflowState
  completion?: number
}) => {
  if (typeof completion !== 'number') {
    return null
  }

  switch (workflowState) {
    case 'failed':
    case 'completed':
    case 'waiting_for_select':
      return null
    default:
      return (
        <ProgressBar
          size="small"
          meterColor="info"
          screenReaderLabel={I18n.t('Loading completion')}
          valueNow={completion}
          valueMax={100}
          // @ts-ignore
          shouldAnimate={true}
        />
      )
  }
}
