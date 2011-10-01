#
# Copyright (C) 2011 Instructure, Inc.
#
# This file is part of Canvas.
#
# Canvas is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation, version 3 of the License.
#
# Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
# details.
#
# You should have received a copy of the GNU Affero General Public License along
# with this program. If not, see <http://www.gnu.org/licenses/>.
#

require 'skip_callback'

module SIS
  module CSV
    class XlistImporter < BaseImporter
    
      def self.is_xlist_csv?(row)
        row.header?('xlist_course_id') && row.header?('section_id')
      end
    
      # possible columns:
      # xlist_course_id, section_id, status
      def process(csv)
        @sis.counts[:xlists] += SIS::XlistImporter.new(@batch.try(:id), @root_account, logger).process do |importer|
          csv_rows(csv) do |row|
            update_progress

            begin
              importer.add_crosslist(row['xlist_course_id'], row['section_id'], row['status'])
            rescue ImportError => e
              add_warning(csv, "#{e}")
            end
          end
        end
      end
    end
  end
end
